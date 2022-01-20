/**
 * Logic related to patient intake forms
 */
import Allergy from "../models/chart/allergy";
import Medication from "../models/chart/medication";
import {
  IntakeResponse,
  QuestionResponse,
  QuizResponse,
  AnswerValue,
} from "../models/intake";
import { Patient } from "../models/patient";
import { updateInitialAssessment } from "./assessment";
import { BadRequestError } from "../utils/errors";

interface QuizScores {
  phqScore: number;
  gadScore: number;
  adhdScore: number;
}

/**
 *
 * @param answers raw JSON blob from the frontend
 * @returns IntakeResponse model
 */
export const createIntake = async (
  answers: Object
): Promise<IntakeResponse> => {
  const response = { answers } as QuizResponse;
  return await IntakeResponse.query().insert({ response });
};

const validateFollowUp = (followUp: any[]) => {
  if (
    !followUp.every(
      (x) => typeof x === "object" && "question" in x && "answer" in x
    )
  ) {
    throw new BadRequestError("answers is invalid");
  }
};

/**
 *
 * Used to add questions from after payment to the intake
 * @param patient Patient to update
 * @param followUp answers to questions
 */
export const updateIntake = async (
  patient: Patient,
  followUp: Array<QuestionResponse>
) => {
  validateFollowUp(followUp);
  const intakeResponse = await IntakeResponse.query()
    .where({ patientId: patient.id })
    .first();
  const currentResponse = intakeResponse.response;
  const newResponse = { ...currentResponse, followUp };
  await intakeResponse.$query().patch({ response: newResponse });

  const medicationAnswer =
    findAnswerByKey(intakeResponse, "medications")?.answer ?? [];
  const allergyAnswer =
    findAnswerByKey(intakeResponse, "allergies")?.answer ?? [];

  const medications = medicationAnswer
    .filter((m) => m.key !== "none")
    .map((m) => ({
      name: m.content,
      patientId: patient.id,
      homeMedication: true,
    }));
  const allergies = allergyAnswer
    .filter((m) => m.key !== "none")
    .map((a) => ({ name: a.content, patientId: patient.id }));

  const genderAnswer =
    findAnswerByKey(intakeResponse, "gender")?.answer ||
    findAnswerByKey(intakeResponse, "sex")?.answer;
  const gender = genderAnswer ? genderAnswer[0].key : "female";

  await patient.$query().patch({ gender });
  if (medications.length > 0) {
    await Medication.query().insert(medications);
  }
  if (allergies.length > 0) {
    await Allergy.query().insert(allergies);
  }

  await updateInitialAssessment(patient, followUp);
};

export const findAnswerByKey = (response: IntakeResponse, key: string) => {
  const answers = response.response.answers ?? [];
  const followUp = response.response.followUp ?? [];
  const allAnswers = [...answers, ...followUp];
  const answer = allAnswers.find((a) => a.question.key === key);
  return answer;
};

const answerContainsAny = (
  response: IntakeResponse,
  key: string,
  choices: Array<string>
) => {
  const answer = findAnswerByKey(response, key);
  if (!answer) {
    return false;
  }
  return choices.some(
    (c) => answer.answer.find((a) => a.key === c) !== undefined
  );
};

/**
 *
 * @param intakeId Patient intake ID
 * @returns true if the user is eligible to signup, false otherwise
 */
export const isEligible = async (intakeId: string) => {
  const intake = await IntakeResponse.query().findById(intakeId);

  const reasons = [];

  if (answerContainsAny(intake, "previous_diagnosis", ["schizophrenia"])) {
    reasons.push("schizophrenia");
  }

  const phqSuicide = findAnswerByKey(intake, "phq-9")
    ?.answer as Array<AnswerValue>;
  if ((phqSuicide[0]?.value || 0) > 4) {
    reasons.push("phq");
  }

  const suicideAttempt = findAnswerByKey(intake, "suicide_attempt")?.answer;
  if (suicideAttempt?.[0].key === "recent_suicide_attempt") {
    reasons.push(suicideAttempt?.[0].key);
  }

  if (reasons.length > 0) {
    await intake
      .$query()
      .patch({ eligible: false, rejectionReason: reasons.join(",") });
    return false;
  }

  await intake.$query().patch({ eligible: true });
  return true;
};

const sumScore = (answers: Array<QuestionResponse>) => {
  return answers
    .map((a) => {
      const ans = a.answer[0];
      return ans.value || 0;
    })
    .reduce((a, b) => a + b, 0 as number);
};

const calculatePhqScore = (answers: Array<QuestionResponse>) => {
  const questions = answers.filter((a) => a.question.key?.includes("phq-"));
  return sumScore(questions);
};

const calculateGadScore = (answers: Array<QuestionResponse>) => {
  const questions = answers.filter((a) => a.question.key?.includes("gad-"));
  return sumScore(questions);
};

const calculateAdhdScore = (answers: Array<QuestionResponse>) => {
  const questions = answers.filter((a) => a.question.key?.includes("adhd-"));
  return sumScore(questions);
};

export const calculateScores = (response: IntakeResponse) => {
  const phqScore = calculatePhqScore(response.response.answers);
  const gadScore = calculateGadScore(response.response.answers);
  // Use part A of Adult ADHD Self Report Scale
  // http://contentmanager.med.uvm.edu/docs/default-source/ahec-documents/adult_adhd_self_report_scale.pdf?sfvrsn=2
  const adhdScore = calculateAdhdScore(response.response.answers);
  return { phqScore, gadScore, adhdScore };
};

export const getSeverityLevel = (scores: QuizScores) => {
  let anxietyLevel = "minimal";
  if (scores.gadScore > 15) {
    anxietyLevel = "severe";
  } else if (scores.gadScore > 10) {
    anxietyLevel = "moderate";
  } else if (scores.gadScore > 4) {
    anxietyLevel = "mild";
  }

  let depressionLevel = "minimal";
  if (scores.phqScore > 20) {
    depressionLevel = "severe";
  } else if (scores.phqScore > 10) {
    depressionLevel = "moderate";
  } else if (scores.phqScore > 4) {
    depressionLevel = "mild";
  }

  let adhdLevel = "minimal";
  if (scores.adhdScore >= 0) {
    adhdLevel = "Further screening suggested";
  } else {
    adhdLevel = "Unlikely";
  }

  return { anxietyLevel, depressionLevel, adhdLevel };
};
