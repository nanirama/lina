/**
 * Post payment medical intake questions
 */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import Quiz from "../../components/onboarding/quiz/Quiz";
import { submitMedicalIntake } from "../../lib/api";
import { drugSuggestions } from "../../lib/suggestions";
import {
  QuestionResponse,
  QuizType,
} from "@healthgent/server/src/lib/api_types";

interface Props { }

const quiz: QuizType = {
  questions: [
    {
      question_type: "FREEFORM_MULTIPLE",
      key: "medications",
      content: "Do you take any medicines, vitamins, or dietary supplements?",
      placeholder: "Medication name",
      noneDesc: "I am not taking any",
      suggestions: drugSuggestions,
    },
    {
      question_type: "FREEFORM_MULTIPLE",
      key: "allergies",
      content: "Do you have any allergies?",
      placeholder: "Allergy",
      noneDesc: "I have no allergies",
    },
    {
      question_type: "FREEFORM_MULTIPLE",
      key: "previous_mental_health_conditions",
      content:
        "What mental health conditions have you been diagnosed with or received treatment for, if any?",
      placeholder: "Name of condition",
      noneDesc: "Have not been diagnosed",
    },
    {
      question_type: "FREEFORM_MULTIPLE",
      key: "previous_medical_conditions",
      content:
        "What medical conditions have you been diagnosed with or received treatment for, if any?",
      placeholder: "Name of condition",
      noneDesc: "Have not been diagnosed",
    },
    {
      question_type: "MULTIPLE_CHOICE",
      key: "heart_conditions",
      content:
        "Do you currently have any heart conditions or taking any medication to treat high blood pressure?",
      choices: [
        { content: "Yes", key: "yes" },
        { content: "No", key: "no" },
      ],
    },
  ],
};

const IntakeQuestions: React.FC<Props> = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Array<QuestionResponse>>([]);

  const router = useRouter();

  useEffect(() => {
    router.push(
      `/onboarding/intake-questions?question=${currentQuestionIdx + 1}`,
      undefined,
      {
        shallow: true,
      }
    );
  }, [currentQuestionIdx]);

  useEffect(() => {
    const question = router.query?.question as string;
    if (question) {
      const idx = parseInt(question);
      setCurrentQuestionIdx(Math.min(idx - 1, answers.length));
    }
  }, [router.query]);

  const onComplete = async (quiz: Array<QuestionResponse>) => {
    await submitMedicalIntake(quiz);
    router.push(`/onboarding/address`);
  };

  const onBack = () => {
    setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1));
  };

  const updateAnswers = (answer: QuestionResponse) => {
    const filtered = answers.filter(
      (a) => a.question.key !== answer.question.key
    );
    setAnswers([...filtered, answer]);
  };

  const onNext = (answer: QuestionResponse) => {
    updateAnswers(answer);
    if (currentQuestionIdx === quiz.questions.length - 1) {
      onComplete(answers);
    } else {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };
  const pct = 15 + 70 * (currentQuestionIdx / quiz.questions.length);
  return (
    <OnboardingContainer
      stage="intake-questions"
      percent={pct}
      title="Lina - Appointment Intake"
    >
      <Quiz
        quiz={quiz}
        answers={answers}
        onBack={onBack}
        onNext={onNext}
        currentQuestionIdx={currentQuestionIdx}
      />
    </OnboardingContainer>
  );
};

export default IntakeQuestions;
