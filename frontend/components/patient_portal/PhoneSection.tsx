/**
 * Section where the patient can modify their phone number
 */
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { updatePhone } from "../../lib/api";
import TextInput from "@healthgent/common/src/forms/TextInput";
import Button from "../core/Button";

interface Props {
  phone: string;
  onComplete: () => void;
}

const PhoneSection: React.FC<Props> = ({ phone, onComplete }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState("");
  const editPhone = (
    <Formik
      initialValues={{
        phone,
      }}
      validationSchema={Yup.object({
        phone: Yup.string().required("Required"),
      })}
      // validator={() => {}}
      onSubmit={(values) => {
        setError("");
        updatePhone(values.phone)
          .then(onComplete)
          .then(() => setIsEdit(false))
          .catch((e) => setError(e.toString()));
      }}
    >
      <Form>
        <TextInput type="text" label="" name="phone" placeholder={phone} />
        {error ? <div className="text-red-400">{error}</div> : null}
        <Button type="submit">Save</Button>
        <Button onClick={() => setIsEdit(false)}>Cancel</Button>
      </Form>
    </Formik>
  );
  return (
    <div className="p-2">
      <div className="flex w-full">
        <div className="w-20 md:w-36 font-semibold">Phone</div>
        {!isEdit ? <div>{phone}</div> : null}
        <a
          href="#"
          className="flex items-center uppercase text-sm font-semibold tracking-wide ml-auto"
          onClick={() => setIsEdit(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          edit
        </a>
      </div>
      <hr className="mb-2" />
      {isEdit ? editPhone : null}
    </div>
  );
};

export default PhoneSection;
