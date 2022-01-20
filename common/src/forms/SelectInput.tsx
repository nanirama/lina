/**
 * Generic <select> tag with some minimal styling
 */
import { useField } from "formik";
import React from "react";

interface Props {
  label: string;
  name: string;
  hideError?: boolean;
  [x: string]: any;
}

const SelectInput: React.FC<Props> = ({
  label,
  name,
  hideError,
  children,
  ...props
}) => {
  const [field, meta] = useField(name);
  return (
    <div className="flex flex-col w-full">
      <label className="ml-1 font-light text-sm" htmlFor={name}>
        {label}
      </label>
      <select
        className="text-input w-full"
        {...field}
        {...props}
        value={field.value}
      >
        {children}
      </select>
      {meta.touched && meta.error && !hideError ? (
        <div className="text-xs text-red-400">{meta.error}</div>
      ) : null}
    </div>
  );
};
export default SelectInput;
