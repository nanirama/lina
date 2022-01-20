/**
 * Phone input - I don't think this is used because of the text mask
 */
import { useField } from "formik";
import React from "react";

interface Props {
  label: string;
  name: string;
  [x: string]: any;
}

const formatPhoneNumber = (phone: string) =>
  phone.replace(/\D+/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

const PhoneInput: React.FC<Props> = ({ label, name, type, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <div className="flex flex-col mb-2">
      <label className="mb-1 font-light text-sm" htmlFor={name}>
        {label}
      </label>
      <input
        className="focus:ring-darkGray focus:border-darkGray focus:ring-0 block w-full pl-4 sm:text-sm border-darkGray-300 rounded-lg"
        type={"text"}
        value={field.value}
        onChange={(e) => {
          if (formatPhoneNumber(e.target.value).length <= 14) {
            field.onChange(name)(formatPhoneNumber(e.target.value));
          }
        }}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-xs text-red-400">{meta.error}</div>
      ) : null}
    </div>
  );
};
export default PhoneInput;
