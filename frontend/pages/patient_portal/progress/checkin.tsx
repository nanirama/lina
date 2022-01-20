/**
 * Follow-up quiz for logged in users
 */
import { useRouter } from "next/router";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  QuestionResponse,
  QuizType,
} from "../../../../server/src/models/intake";
import Quiz from "../../../components/onboarding/quiz/Quiz";
import BasePatientPortalView from "../../../components/patient_portal/BasePatientPortalView";
import { GAD_QUESTIONS, PHQ_QUESTIONS } from "../../../lib/questions";
import { submitCheckin } from "../../../lib/api";

interface Props { }

const quiz: QuizType = {
  // @ts-ignore
  questions: [...PHQ_QUESTIONS, ...GAD_QUESTIONS],
};

const Checkin: NextPage<Props> = () => {
  // TODO(sbb): this is copy pasted 3x pls fix
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Array<QuestionResponse>>([]);

  const router = useRouter();

  useEffect(() => {
    router.push(`?question=${currentQuestionIdx + 1}`, undefined, {
      shallow: true,
    });
  }, [currentQuestionIdx]);

  useEffect(() => {
    const question = router.query?.question as string;
    if (question) {
      const idx = parseInt(question);
      setCurrentQuestionIdx(Math.min(idx - 1, answers.length));
    }
  }, [router.query]);

  const onComplete = async (quiz: Array<QuestionResponse>) => {
    submitCheckin(quiz).then(() => {
      router.push("/patient_portal/progress/history");
    });
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
  return (
    <BasePatientPortalView>
      <Quiz
        quiz={quiz}
        answers={answers}
        onBack={onBack}
        onNext={onNext}
        currentQuestionIdx={currentQuestionIdx}
      />
    </BasePatientPortalView>
  );
};

export default Checkin;
