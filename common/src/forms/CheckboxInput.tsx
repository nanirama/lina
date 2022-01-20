/**
 * Generic styled checkbox component
 */
import { useField } from "formik";
import React from "react";

interface Props {
  name: string;
  [x: string]: any;
}

const CheckboxInput: React.FC<Props> = ({ children, name, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <div className="flex flex-col mb-2">
      <div className="flex w-full items-center">
        <input
          className="text-input mr-3 text-coral"
          {...field}
          {...props}
          type={"checkbox"}
          checked={field.value}
        />
        <label className="font-light text-xs" htmlFor={name}>
          {children}
        </label>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-xs text-red-400">{meta.error}</div>
      ) : null}
    </div>
  );
};
export default CheckboxInput;
