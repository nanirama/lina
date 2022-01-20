/**
 * Used to edit patient medications in <AllergyList />.
 */

import React, { useState } from "react";
import Modal from "../Modal";
import { AllergyType } from "@healthgent/server/src/lib/api_types";
import { Form, Formik } from "formik";
import { TextInput } from "@healthgent/common";

interface Props {
  onClose: () => any;
  allergy?: AllergyType;
  saveAllergy: (a: AllergyType) => Promise<any>;
}

const AllergyEditModal: React.FC<Props> = ({
  onClose,
  allergy,
  saveAllergy,
}) => {
  const [error, setError] = useState("");
  return (
    <Modal onClose={onClose}>
      <div className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Edit Allergy
      </div>
      <Formik
        initialValues={{
          name: allergy?.name || "",
          severity: allergy?.severity || "",
          reaction: allergy?.reaction || "",
        }}
        onSubmit={(values) => {
          saveAllergy(values)
            .then(onClose)
            .catch((e) => setError(e.toString()));
        }}
      >
        <Form>
          <TextInput type="text" label="Name" name="name" />
          <TextInput type="text" label="Severity" name="severity" />
          <TextInput type="text" label="Reaction" name="reaction" />
          <button type="submit" className="mt-2 primary-button-blue">
            Save
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AllergyEditModal;
