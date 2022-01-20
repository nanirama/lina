/**
 * Patient referral from the landing page
 * I don't think this is actively used anymore.
 */
import { PatientReferral } from "@healthgent/server/src/lib/api_types";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import PhoneInput from "./PhoneInput";
import TextInput from "./TextInput";

interface Props {
  onSubmit: (d: PatientReferral) => Promise<unknown>;
}

const ReferralForm: React.FC<Props> = ({ onSubmit }) => {
  const [error, setError] = useState("");
  return (
    <Formik
      initialValues={{
        patientName: "",
        patientEmail: "",
        patientPhone: "",
        providerName: "",
        providerEmail: "",
        providerPhone: "",
      }}
      validationSchema={Yup.object({
        patientName: Yup.string().required("Required"),
        patientEmail: Yup.string().email().required("Required"),
        patientPhone: Yup.string().required("Required"),
        providerName: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        onSubmit(values).catch((e) => setError(e.toString()));
      }}
    >
      <Form>
        <h2 className="text-2xl">Patient Info</h2>
        <TextInput name="patientName" label="Name" />
        <TextInput name="patientEmail" label="Email" />
        <PhoneInput name="patientPhone" label="Phone" />

        <h2 className="text-2xl">Provider Info</h2>
        <TextInput name="providerName" label="Name" />
        <TextInput name="providerEmail" label="Email (optional)" />
        <PhoneInput name="providerPhone" label="Phone (optional)" />
        {error ? <div className="text-red-400">{error}</div> : null}
        <button type="submit" className="primary-button-blue">
          Submit Referral
        </button>
      </Form>
    </Formik>
  );
};

export default ReferralForm;
