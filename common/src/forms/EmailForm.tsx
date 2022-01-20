/**
 * Form used to enter an email
 * same as a textbox but uses Yup to validate an email is in the right format
 */
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import HealthgentButton from "../../../frontend/components/core/HealthgentButton";
import TextInput from "./TextInput";

interface Props {
  email?: string;
  onSubmit: (email: string) => Promise<any>;
}

const EmailForm: React.FC<Props> = ({ email, onSubmit, children }) => {
  const [error, setError] = useState("");
  return (
    <Formik
      initialValues={{
        email,
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={(values) => {
        if (!values.email) {
          setError("Required");
          return;
        }
        setError("");
        onSubmit(values.email).catch((e: Error) => setError(e.toString()));
      }}
    >
      <Form>
        <TextInput type="text" label="" name="email" placeholder={email} />
        {error ? <div className="text-red-400">{error}</div> : null}
        {children}
      </Form>
    </Formik>
  );
};

export default EmailForm;
