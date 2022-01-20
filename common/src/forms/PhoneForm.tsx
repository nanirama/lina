/**
 * Phone form using a phone input (see PhoneInput.tsx) and basic validation for the format
 * I don't think this is used because of the text mask input (see MaskedTextInput.tsx)
 */
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";
import PhoneInput from "./PhoneInput";

interface Props {
  phone?: string;
  onSubmit: (phone: string) => Promise<any>;
}

const EmailForm: React.FC<Props> = ({ phone, onSubmit, children }) => {
  const [error, setError] = useState("");
  return (
    <Formik
      initialValues={{
        phone,
      }}
      validationSchema={Yup.object({
        phone: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        if (!values.phone) {
          setError("required");
          return;
        }
        setError("");
        onSubmit(values.phone).catch((e: Error) => setError(e.toString()));
      }}
    >
      <Form>
        <PhoneInput name="phone" label="" placeholder={phone} />
        {error ? <div className="text-red-400">{error}</div> : null}
        {children}
      </Form>
    </Formik>
  );
};

export default EmailForm;
