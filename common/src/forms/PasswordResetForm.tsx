/**
 * generic password reset form
 */
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import TextInput from "./TextInput";

interface Props {
  onComplete?: () => void;
  handleSubmit: (password: string) => Promise<any>;
}

const PasswordResetForm: React.FC<Props> = ({
  onComplete,
  children,
  handleSubmit,
}) => {
  const [error, setError] = useState("");
  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        password: Yup.string().required("Required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords do not match")
          .required("Required"),
      })}
      onSubmit={(values) => {
        setError("");
        handleSubmit(values.password)
          .then(onComplete)
          .catch((e) => setError(e.toString()));
      }}
    >
      <Form>
        <TextInput type="password" label="Password" name="password" />
        <TextInput
          type="password"
          label="Confirm Password"
          name="confirmPassword"
        />
        {error ? <div className="text-red-400">{error}</div> : null}
        <div className="mt-2">{children}</div>
      </Form>
    </Formik>
  );
};

export default PasswordResetForm;
