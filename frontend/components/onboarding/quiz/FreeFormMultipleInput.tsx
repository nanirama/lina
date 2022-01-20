/**
 * Multiple choice input with optional free form answers for use
 * during patient intake.
 */
import React, { useEffect, useState } from "react";
import { useKeyPress } from "@healthgent/common";
import {
  FreeformMultipleQuestion,
  AnswerValue,
} from "@healthgent/server/src/lib/api_types";
import cx from "classnames";
import Button from "../../core/Button";

interface Props {
  question: FreeformMultipleQuestion;
  onAnswerChange: (answer: Array<AnswerValue>) => void;
  selectedAnswers: Array<AnswerValue>;
  suggestions?: Array<string>;
}

const FreeFormMultipleInput = ({
  question,
  onAnswerChange,
  selectedAnswers,
  suggestions,
}: Props) => {
  const [inputValue, setInputValue] = useState("");

  const setIsNone = (n: boolean) =>
    n ? onAnswerChange([{ key: "none", content: "None" }]) : onAnswerChange([]);
  const isNone = selectedAnswers.find((a) => a.key === "none") !== undefined;

  const updateItems = (item: string) => {
    const newItems = [...selectedAnswers, { content: item, key: "" }];
    onAnswerChange(newItems);
  };

  const onClick = () => {
    if (inputValue) {
      updateItems(inputValue);
      setInputValue("");
    }
  };

  const onClickOption = (option: string) => {
    updateItems(option);
    setInputValue("");
  };

  const removeItem = (item: string) => {
    const newItems = selectedAnswers.filter((i) => i.content !== item);
    onAnswerChange(newItems);
  };

  const pressEnter = useKeyPress("Enter");
  if (pressEnter) {
    onClick();
  }
  const filteredSuggestions =
    suggestions && !!inputValue
      ? suggestions
        .filter((s) => s.toLowerCase().includes(inputValue.toLowerCase()))
        .slice(0, 5)
      : [];

  const items = selectedAnswers.filter((a) => a.key !== "none");

  return (
    <>
      <div className="flex flex-col justify-center mb-2">
        <div className="flex w-full">
          <input
            type="text"
            placeholder={question.placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="text-input w-full"
          ></input>
          <Button onClick={onClick} className="ml-2">
            Add
          </Button>
        </div>
        {filteredSuggestions.length > 0 ? (
          <div className="flex flex-col bg-white rounded-lg border mt-1">
            {filteredSuggestions.map((s) => (
              <div
                key={s}
                className="py-1 pl-2 hover:bg-gray-200"
                onClick={() => onClickOption(s)}
              >
                {s}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div
        className={cx("font-semibold text-sm mb-2 text-center", {
          hidden: items.length > 0,
        })}
      >
        or
      </div>
      <div
        className={cx(
          "p-2 mb-4 text-center rounded border",
          { hidden: items.length > 0 },
          isNone ? "border-coral" : "border-darkGray-200"
        )}
        onClick={() => setIsNone(!isNone)}
      >
        {question.noneDesc}
      </div>

      {items.map((item) => (
        <div
          key={`selected_answers${item.key}`}
          className="flex flex-row p-2 mb-2 text-center rounded border border-coral-300 hover:border-coral"
        >
          {item.content}
          <a
            href="#"
            onClick={() => removeItem(item.content)}
            className="ml-auto flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="#eda4a4"
              stroke="#f9fafb"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      ))}
    </>
  );
};

export default FreeFormMultipleInput;
