/**
 * Section allowing a patient to modify their email
 */
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { updateEmail } from "../../lib/api";
import TextInput from "@healthgent/common/src/forms/TextInput";
import Button from "../core/Button";

interface Props {
  email: string;
  onComplete: () => void;
}

const EmailSection: React.FC<Props> = ({ email, onComplete }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState("");
  const editEmail = (
    <Formik
      initialValues={{
        email,
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      // validator={() => {}}
      onSubmit={(values) => {
        setError("");
        updateEmail(values.email)
          .then(onComplete)
          .then(() => setIsEdit(false))
          .catch((e) => setError(e.toString()));
      }}
    >
      <Form>
        <TextInput type="text" label="" name="email" placeholder={email} />
        {error ? <div className="text-red-400">{error}</div> : null}
        <Button type="submit">Save</Button>
        <Button onClick={() => setIsEdit(false)}>Cancel</Button>
      </Form>
    </Formik>
  );
  return (
    <div className="p-2">
      <div className="flex w-full">
        <div className="w-20 md:w-36 font-semibold">Email</div>
        {!isEdit ? <div>{email}</div> : null}
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
      <div>{isEdit ? editEmail : null}</div>
    </div>
  );
};

export default EmailSection;
