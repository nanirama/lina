/**
 * This is used to initiate a thread from the patient side, with the patient being
 * able to select a type of thread (treatment question, refill, etc).
 */
import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import * as Yup from "yup";

interface CreateThreadParams {
  threadType: string;
  content: string;
}
interface Props {
  handleSubmit: (t: CreateThreadParams) => Promise<any>;
}

const NewThreadForm: React.FC<Props> = ({ handleSubmit, children }) => {
  const [error, setError] = useState("");
  return (
    <Formik
      initialValues={{
        threadType: "TREATMENT_QUESTION",
        content: "",
      }}
      // validationSchema={Yup.object({})}
      onSubmit={(values) => {
        setError("");
        handleSubmit(values).catch((e) => setError(e.toString()));
      }}
    >
      <Form className="flex flex-col space-y-2">
        <SelectInput name="threadType" label="Concern">
          <option value="TREATMENT_QUESTION">Treatment Question</option>
          <option value="PRESCRIPTION_REFILL">Prescription Refill</option>
        </SelectInput>
        <TextInput textArea={true} label="Message" name="content" />
        {error ? <div className="text-red-400">{error}</div> : null}
        {children}
      </Form>
    </Formik>
  );
};

export default NewThreadForm;
