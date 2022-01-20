/**
 * Component implementing the initial quiz logic. Note that this
 * will be deprecated if we switch to Savvy for the quiz. See QuizWrapper
 * for an example of using this component.
 */
import React, { useEffect, useState } from "react";
import FreeFormInput from "./FreeFormInput";
import FreeFormMultipleInput from "./FreeFormMultipleInput";
import MultipleChoiceInput from "./MultipleChoiceInput";
import cx from "classnames";
import {
  QuestionResponse,
  FreeformMultipleQuestion,
  MultipleChoiceQuestion,
  QuizType,
  AnswerValue,
} from "@healthgent/server/src/lib/api_types";
import Button from "../../core/Button";

interface Props {
  quiz: QuizType;
  answers: Array<QuestionResponse>;
  currentQuestionIdx: number;
  onNext: (answer: QuestionResponse) => any;
  onBack: () => any;
}

const Quiz: React.FC<Props> = ({
  quiz,
  answers,
  onNext,
  onBack,
  currentQuestionIdx,
}) => {
  const currentQuestion = quiz.questions[currentQuestionIdx];
  const [answer, setAnswer] = useState<Array<AnswerValue>>([]);

  useEffect(() => {
    setAnswer(
      answers.find((a) => a.question.key === currentQuestion.key)?.answer ?? []
    );
    if (currentQuestion.question_type === "INTERSTITIAL") {
      setAnswer([{ content: "", key: "unused-1" }]);
    }
  }, [currentQuestionIdx, answers]);

  const continueQuiz = () => {
    onNext({ question: currentQuestion, answer });
  };

  const enabled = answer.length > 0;
  const showButton =
    currentQuestion.question_type !== "MULTIPLE_CHOICE" ||
    currentQuestion.allowMultiple;

  return (
    <div className="max-w-lg">
      <div className="overflow-hidden">
        {quiz.questions.map((currentQuestion, idx) => {
          let questionInput = null;
          const mcQuestion = currentQuestion as MultipleChoiceQuestion;
          const onMultipleChoiceChange = (s: Array<AnswerValue>) => {
            if (mcQuestion.allowMultiple) {
              setAnswer(s);
              return;
            } else {
              setAnswer(s);
              if (s.length > 0) {
                setTimeout(() => {
                  onNext({ question: currentQuestion, answer: s });
                }, 300);
              }
            }
          };
          switch (currentQuestion.question_type) {
            case "MULTIPLE_CHOICE":
              questionInput = (
                <MultipleChoiceInput
                  question={mcQuestion}
                  onAnswerChange={onMultipleChoiceChange}
                  selectedAnswers={answer}
                />
              );
              break;
            case "FREEFORM_MULTIPLE":
              questionInput = (
                <FreeFormMultipleInput
                  // @ts-ignore
                  question={currentQuestion as FreeformMultipleQuestion}
                  onAnswerChange={(items) => setAnswer(items)}
                  suggestions={currentQuestion.suggestions}
                  selectedAnswers={answer}
                />
              );
              break;
            case "INTERSTITIAL":
              questionInput = currentQuestion.custom(answers);
              break;
            case "CUSTOM":
              questionInput = currentQuestion.custom(answers);
              break;
            case "FREEFORM":
            default:
              questionInput = (
                <FreeFormInput
                  //@ts-ignore
                  question={currentQuestion as FreeformQuestion}
                  onAnswerChange={(s) => setAnswer([{ content: s, key: "" }])}
                  inputType={currentQuestion.inputType}
                />
              );
          }
          const hidden = currentQuestionIdx !== idx;
          const className = cx(
            "overflow-auto text-center",
            "px-8 lg:px-24",
            "transition ease-in-out delay-200	duration-500 transform",
            {
              "h-full translate-x-0": !hidden,
              "h-0 translate-x-full": hidden,
            }
          );
          // @ts-ignore
          const allowMultiple = currentQuestion.allowMultiple;
          const isCustom = currentQuestion.question_type === "CUSTOM";
          return (
            <div key={currentQuestion.content} className={className}>
              <div className="mb-6 flex flex-col space-y-4">
                {currentQuestion.pretext ? (
                  <span className="text-sm leading-snug">
                    {currentQuestion.pretext}
                  </span>
                ) : null}
                {!isCustom ? (
                  <h1 className="text-2xl leading-snug">
                    {currentQuestion.content}
                  </h1>
                ) : null}
                {currentQuestion.subtext ? (
                  <span className="leading-snug">
                    {currentQuestion.subtext}
                  </span>
                ) : null}
                {allowMultiple ? (
                  <span className="">Select all that apply.</span>
                ) : null}
              </div>
              {questionInput}
              <Button
                className="w-full"
                disabled={!enabled}
                hidden={!showButton}
                onClick={enabled ? continueQuiz : undefined}
              >
                Continue
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;
