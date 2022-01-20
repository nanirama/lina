/**
 * Component wrapping the quiz component. Passes the list of questions
 * and persists state for answers and index of the current question
 */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  QuestionResponse,
  QuizType,
} from "@healthgent/server/src/lib/api_types";
import Quiz from "./quiz/Quiz";
import OnboardingContainer from "./OnboardingContainer";
import { submitQuiz } from "../../lib/api";
import { logEvent } from "../../lib/event_logging";

interface Props {
  quiz: QuizType;
}

const QuizWrapper: React.FC<Props> = ({ quiz }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Array<QuestionResponse>>([]);

  const router = useRouter();

  useEffect(() => {
    router.push(
      {
        pathname: router.pathname,
        query: { question: currentQuestionIdx + 1 },
      },
      undefined,
      { shallow: true }
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
    const intakeId = await submitQuiz(quiz);
    logEvent("complete-assessment");
    router.push(`/onboarding/results?intakeId=${intakeId || ""}`);
  };

  const onBack = () => {
    if (currentQuestionIdx === 0) {
      router.back();
      return;
    }
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
      stage="questionnaire"
      percent={pct}
      title="Lina - Questionnaire"
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

export default QuizWrapper;
