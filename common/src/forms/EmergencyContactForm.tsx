/**
 * Form used to enter the name, relationship, and other contact info
 * for a patient emergency contact
 */
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import PhoneInput from "./PhoneInput";
import TextInput from "./TextInput";

interface EmergencyContact {
  firstName: string;
  lastName: string;
  relationship: string;
  phoneNumber: string;
}

interface Props {
  emergencyContact?: EmergencyContact;
  handleSubmit: (ec: EmergencyContact) => Promise<any>;
}

const EmergencyContactForm: React.FC<Props> = ({
  emergencyContact,
  children,
  handleSubmit,
}) => {
  const [error, setError] = useState("");
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        relationship: "",
        phoneNumber: "",
        ...emergencyContact,
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        relationship: Yup.string().required("Required"),
        phoneNumber: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        setError("");
        handleSubmit(values).catch((e) => setError(e.toString()));
      }}
    >
      <Form>
        <TextInput type="text" label="First Name" name="firstName" />
        <TextInput type="text" label="Last Name" name="lastName" />
        <TextInput type="text" label="Relationship" name="relationship" />
        <PhoneInput type="text" label="Phone Number" name="phoneNumber" />
        {error ? <div className="text-red-400">{error}</div> : null}
        {children}
      </Form>
    </Formik>
  );
};

export default EmergencyContactForm;
