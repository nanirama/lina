/**
 * generic form used to enter a US mailing address
 */
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import TextInput from "./TextInput";
import { states, USState } from "@healthgent/server/src/utils/states";
import SelectInput from "./SelectInput";

interface Address {
  streetAddress: string;
  unitNumber?: string;
  city: string;
  state: string;
  zip: string;
}
interface Props {
  address?: Address;
  handleSubmit: (a: Address) => Promise<unknown>;
  eligibleStates?: Array<USState>;
}

const AddressForm: React.FC<Props> = ({
  address,
  children,
  handleSubmit,
  eligibleStates,
}) => {
  const stateList = eligibleStates || states;
  const [error, setError] = useState("");
  return (
    <Formik
      initialValues={{
        streetAddress: "",
        unitNumber: "",
        city: "",
        state: "",
        zip: "",
        ...address,
      }}
      validationSchema={Yup.object({
        streetAddress: Yup.string().required("Required"),
        unitNumber: Yup.string(),
        city: Yup.string().required("Required"),
        state: Yup.string().required("Required"),
        zip: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        setError("");
        handleSubmit(values).catch((e) => setError(e.toString()));
      }}
    >
      <Form className="flex flex-col space-y-2">
        <TextInput type="text" label="Street Address" name="streetAddress" />
        <TextInput
          type="text"
          label="Unit/Apartment # (optional)"
          name="unitNumber"
        />
        <TextInput type="text" label="City" name="city" />
        <SelectInput name="state" label="State">
          <option key={""}>Select State</option>
          {stateList.map(({ name, abbreviation }) => (
            <option key={abbreviation} value={abbreviation}>
              {name}
            </option>
          ))}
        </SelectInput>
        <TextInput type="text" label="Zip Code" name="zip" />
        {error ? <div className="text-red-400">{error}</div> : null}
        {children}
      </Form>
    </Formik>
  );
};

export default AddressForm;
