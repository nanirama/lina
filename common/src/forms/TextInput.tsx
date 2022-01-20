/**
 * Generic <input> with some styling, with the option of using a
 * <textarea> tag if the input text is large
 */
import { useField } from "formik";
import React from "react";
import cx from "classnames";

interface Props {
  label: string;
  name: string;
  hideError?: boolean;
  textArea?: boolean;
  showChevron?: boolean;
  [x: string]: any;
}

const TextInput: React.FC<Props> = ({
  label,
  name,
  type = "text",
  hideError,
  textArea,
  showChevron,
  ...props
}) => {
  const [field, meta] = useField(name);
  return (
    <div className="flex flex-col w-full">
      <label className="font-light text-sm" htmlFor={name}>
        {label}
      </label>
      {textArea ? (
        <textarea
          className={cx("text-input w-full", props.className)}
          {...field}
          {...props}
          value={field.value}
        />
      ) : (
        <div className="relative rounded-md shadow-sm">
          <input
            className="focus:ring-darkGray focus:border-darkGray focus:ring-0 block w-full pl-4 sm:text-sm border-darkGray-300 rounded-lg"
            {...field}
            {...props}
            type={type}
            value={field.value}
          />

          {showChevron ? (
            <button
              type="submit"
              className="outline-none absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ) : null}
        </div>
      )}
      {meta.touched && meta.error && !hideError ? (
        <div className="text-xs text-red-400 leading-none mt-1">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};
export default TextInput;
