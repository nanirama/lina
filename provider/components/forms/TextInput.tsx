/**
 * Standard text input component with some styling.
 * Can use either an <input> tag or <textarea>.
 */

import { useField } from "formik";
import React from "react";

interface Props {
  label: string;
  name: string;
  [x: string]: any;
  textarea?: boolean;
}

const TextInput: React.FC<Props> = ({
  label,
  name,
  type,
  textarea,
  ...props
}) => {
  const [field, meta] = useField(name);
  return (
    <div className="flex flex-col mb-2 w-full">
      <label className="ml-1 font-semibold text-sm" htmlFor={name}>
        {label}
      </label>
      {textarea ? (
        <textarea
          className="border solid border-gray-400 rounded-lg focus:ring-2 ring-gray-200 outline-none p-2 w-full"
          {...field}
          {...props}
          value={field.value}
        />
      ) : (
        <input
          className="border solid border-gray-400 rounded-lg outline-none w-full"
          {...field}
          {...props}
          type={type}
          value={field.value}
        />
      )}

      {meta.touched && meta.error ? (
        <div className="text-xs text-red-400">{meta.error}</div>
      ) : null}
    </div>
  );
};
export default TextInput;
