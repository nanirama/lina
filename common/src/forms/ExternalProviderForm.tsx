/**
 * Form used to enter the name of an outside clinician, which can be used
 * to get the name of a therapist or outside PCP
 */
import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";
import PhoneInput from "./PhoneInput";
import CheckboxInput from "./CheckboxInput";

type ExternalProvider = {
  name: string;
  phone: string;
  email: string;
  share: boolean;
};

interface Props {
  providerType: "THERAPIST" | "PCP";
  handleSubmit: (e: ExternalProvider) => Promise<unknown>;
}

const ExternalProviderForm: React.FC<Props> = ({ children, handleSubmit }) => {
  const [error, setError] = useState("");
  return (
    <Formik
      initialValues={{
        name: "",
        phone: "",
        email: "",
        share: true,
      }}
      validationSchema={Yup.object({
        name: Yup.string(),
        phone: Yup.string(),
        email: Yup.string().email(),
        share: Yup.boolean(),
      })}
      onSubmit={(values) => {
        setError("");
        handleSubmit(values).catch((e) => setError(e.toString()));
      }}
    >
      <Form>
        <TextInput type="text" label="Name" name="name" />
        <PhoneInput type="text" label="Phone Number (optional)" name="phone" />
        <TextInput type="email" label="Email (optional)" name="email" />
        <CheckboxInput label="Share information" name="share">
          Lina can share important treatment information with my provider
        </CheckboxInput>
        {error ? <div className="text-red-400">{error}</div> : null}
        {children}
      </Form>
    </Formik>
  );
};

export default ExternalProviderForm;
