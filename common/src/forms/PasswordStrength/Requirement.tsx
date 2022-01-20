/**
 * Shows if a requirement for password strength is fulfilled or not.
 * Red text + x if not, checkmark + green if so
 */
import React, { useState } from "react";
import cx from "classnames";

interface Props {
  isValid: boolean;
  validMessage: string;
  invalidMessage: string;
  htmlFor?: string;
}

const Requirement: React.FC<Props> = ({
  isValid,
  validMessage,
  invalidMessage,
  htmlFor,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cx(
        "flex items-center text-sm",
        isValid ? "text-green-500" : "text-red-500"
      )}
    >
      {isValid ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
      <span>{!isValid ? invalidMessage : validMessage}</span>
    </label>
  );
};

export default Requirement;
