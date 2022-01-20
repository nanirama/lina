/**
 * Generic form used to change a password
 */
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import TextInput from "./TextInput";

interface Props {
  handleSubmit: (currentPassword: string, newPassword: string) => Promise<any>;
}

const ChangePasswordForm: React.FC<Props> = ({ children, handleSubmit }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        currentPassword: Yup.string().required("Required"),
        newPassword: Yup.string().required("Required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("newPassword"), null], "Passwords do not match")
          .required("Required"),
      })}
      onSubmit={(values) => {
        setError("");
        setSuccess("");
        handleSubmit(values.currentPassword, values.newPassword)
          .then(() => setSuccess("Successfully updated password"))
          .catch((e) => setError(e.toString()));
      }}
    >
      <Form>
        <TextInput
          type="password"
          label="Current Password"
          name="currentPassword"
        />
        <TextInput type="password" label="New Password" name="newPassword" />
        <TextInput
          type="password"
          label="Confirm New Password"
          name="confirmPassword"
        />
        {error ? <div className="text-red-400">{error}</div> : null}
        {success ? <div className="text-green-400">{success}</div> : null}
        {children}
      </Form>
    </Formik>
  );
};

export default ChangePasswordForm;
