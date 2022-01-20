/**
 * Used to enter a masked text input, one where you want
 * it to render in a specific format.
 * e.g. Phone number being formatted as
 * (aaa) bbb-cccc
 */
import { useField } from "formik";
import React from "react";
import MaskedInput from "react-text-mask";

interface Props {
  label: string;
  name: string;
  type: string;
  mask: (string | RegExp)[];
  [x: string]: unknown;
}

const MaskedTextInput: React.FC<Props> = ({
  name,
  label,
  type,
  mask,
  ...props
}) => {
  const [field, meta] = useField(name);
  return (
    <div className="flex flex-col mb-2">
      <label className=" font-light text-sm" htmlFor={name}>
        {label}
      </label>

      <div className="relative rounded-md shadow-sm">
        <MaskedInput
          className="focus:ring-darkGray focus:border-darkGray focus:ring-0 block w-full pl-4 sm:text-sm border-darkGray-300 rounded-lg"
          {...field}
          {...props}
          type={type}
          value={field.value}
          mask={mask}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="text-xs text-red-400 leading-none mt-1">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default MaskedTextInput;
