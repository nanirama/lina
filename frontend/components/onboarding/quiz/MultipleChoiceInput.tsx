/**
 * Multiple choice input used during initial intake.
 */
import React from "react";
import {
  MultipleChoiceQuestion,
  AnswerValue,
} from "@healthgent/server/src/lib/api_types";
import cx from "classnames";

interface Props {
  question: MultipleChoiceQuestion;
  onAnswerChange: (answer: Array<AnswerValue>) => void;
  selectedAnswers: Array<AnswerValue>;
}

const MultipleChoiceInput: React.FC<Props> = ({
  question,
  onAnswerChange,
  selectedAnswers,
}) => {
  const updateAnswer = (answer: AnswerValue) => {
    const answerIdx = selectedAnswers.indexOf(answer);
    let newAnswers = [];
    if (answerIdx >= 0) {
      newAnswers = selectedAnswers.filter((a) => a !== answer);
    } else {
      const isNone = answer.key === "none";
      if (question.allowMultiple && !isNone) {
        newAnswers = [...selectedAnswers, answer].filter(
          (a) => a.key !== "none"
        );
      } else {
        newAnswers = [answer];
      }
    }
    onAnswerChange(newAnswers);
  };
  const isYesNo = question.choices.length === 2;
  return (
    <div
      className={cx(
        "grid grid-cols-1 gap-y-2 mb-2",
        isYesNo ? "grid-cols-2" : "grid-cols-1"
      )}
    >
      {question.choices.map((c) => {
        return (
          <div
            className="flex justify-center w-full"
            key={`quiz_answer_${c.key}`}
          >
            <div
              className={cx(
                "border transition-all duration-200",
                "rounded-full text-center",
                isYesNo
                  ? "p-16 w-8 h-8 flex items-center justify-center"
                  : "p-2 w-full",
                selectedAnswers.includes(c) ? "border-darkGray" : "b-0"
              )}
              onClick={() => updateAnswer(c)}
            >
              <div>{c.content}</div>
              {c.subtext ? <div className="text-xs">{c.subtext}</div> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MultipleChoiceInput;
