/**
 * There is logic from intake duplicated here
 * TODO(sbb): Will eventually consolidate
 */

import AssessmentResponse from "../../models/assessment/response";
import AssessmentItem, { QuestionType } from "../../models/assessment/item";
import { QuestionResponse } from "../../models/intake";
import { Patient } from "../../models/patient";
import { ExceptionHandler } from "winston";

const sumScore = (answers: Array<AssessmentItem>) => {
  return answers
    .map((a) => a.answerValue || 0)
    .reduce((a, b) => a + b, 0 as number);
};

const calculatePhqScore = (answers: Array<AssessmentItem>) => {
  const questions = answers.filter((a) => a.questionType === "PHQ");
  return sumScore(questions);
};

const calculateGadScore = (answers: Array<AssessmentItem>) => {
  const questions = answers.filter((a) => a.questionType === "GAD");
  return sumScore(questions);
};

const calculateAdhdScore = (answers: Array<AssessmentItem>) => {
  const questions = answers.filter((a) => a.questionType === "ADHD");
  return sumScore(questions);
};

const calculateInsomniaScore = (answers: Array<AssessmentItem>) => {
  const questions = answers.filter((a) => a.questionType === "INSOMNIA");
  return sumScore(questions);
};

export const calculateScores = (answers: Array<AssessmentItem>) => {
  const phqScore = calculatePhqScore(answers);
  const gadScore = calculateGadScore(answers);

  return { phqScore, gadScore };
};

const getQuestionType = (r: QuestionResponse): QuestionType => {
  // console.log(r);
  const key = r.question.key;
  if (key.indexOf("phq-") > -1) {
    return "PHQ";
  } else if (key.indexOf("gad-") > -1) {
    return "GAD";
  } else if (key.indexOf("adhd-") > -1) {
    return "ADHD";
  }

  return "OTHER";
};

const quizResponsesToItems = (
  assessmentId: number,
  responses: Array<QuestionResponse>
) => {
  return responses
    .map((r) => {
      return r.answer.map((a) => ({
        assessmentId,
        questionType: getQuestionType(r),
        questionKey: r.question.key,
        answerKey: a.key || "",
        answerValue: a.value,
        answerRaw: a.content,
      }));
    })
    .flat();
};

export const updateInitialAssessment = async (
  patient: Patient,
  responses: Array<QuestionResponse>
) => {
  const assessmentResponse = await AssessmentResponse.query()
    .where({
      patientId: patient.id,
      assessmentType: "INITIAL",
    })
    .first();
  if (!assessmentResponse) {
    throw new Error("Could not find initial assessment");
  }
  const items = quizResponsesToItems(assessmentResponse.id, responses);
  if (items.length > 0) {
    await AssessmentItem.query().insertAndFetch(items);
  }
};

export const createAssessmentRecord = async (
  patient: Patient,
  quiz: Array<QuestionResponse>,
  initial: boolean
) => {
  const assessmentResponse = await AssessmentResponse.query().insertAndFetch({
    patientId: patient.id,
    assessmentType: initial ? "INITIAL" : "FOLLOWUP",
  });

  const items = quizResponsesToItems(assessmentResponse.id, quiz);
  const answers = await AssessmentItem.query().insertAndFetch(items);
  const { phqScore, gadScore } = calculateScores(answers);

  return await AssessmentResponse.query().patchAndFetchById(
    assessmentResponse.id,
    {
      phqScore,
      gadScore,
    }
  );
};

export const getAssessmentHistory = async (patient: Patient) => {
  return await AssessmentResponse.query().where({
    patientId: patient.id,
  });
};
