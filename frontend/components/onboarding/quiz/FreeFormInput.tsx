/**
 * Free form text input for use in the quiz
 */
import React from "react";
import { FreeformQuestion } from "@healthgent/server/src/lib/api_types";

interface Props {
  question: FreeformQuestion;
  onAnswerChange: (answer: string) => void;
  inputType: "text" | "textarea";
}

const FreeFormInput = ({ question, onAnswerChange, inputType }: Props) => {
  return (
    <div className="w-full justify-center">
      {inputType === "textarea" ? (
        <textarea
          className="border w-full rounded-lg form-textarea ring-offset-transparent	border-1 ring-transparent focus:ring-darkGray border-darkGray focus:border-darkGray mb-4"
          style={{ outline: "0px", outlineOffset: "0px", resize: "none" }}
          autoFocus
          rows={4}
          onChange={(e) => onAnswerChange(e.target.value)}
        ></textarea>
      ) : (
        <input
          type="text"
          className="border w-full rounded-lg form-textarea ring-offset-transparent	border-1 ring-transparent focus:ring-darkGray border-darkGray focus:border-darkGray mb-4"
          style={{ outline: "0px", outlineOffset: "0px", resize: "none" }}
          autoFocus
          onChange={(e) => onAnswerChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default FreeFormInput;
