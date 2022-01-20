/**
 * Used to display an individiual answer from the intake form
 * Single question/answer
 */
import { QuestionResponse } from "@healthgent/server/src/lib/api_types";
import React from "react";

interface Props {
  answers: Array<QuestionResponse>;
}

const AnswerDisplay: React.FC<Props> = ({ answers }) => {
  return (
    <div className="space-y-4">
      {answers.map((a) => (
        <div key={a.question.key} className="flex flex-col">
          <div>
            <div className="mr-2 mb-1 font-light">{a.question.content}</div>
            <div className="font-semibold">
              {a.answer.map((ans) => ans.content).join(", ")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnswerDisplay;
