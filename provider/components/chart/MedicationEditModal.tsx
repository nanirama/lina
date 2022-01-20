/**
 * Used to edit patient medications in <MedicationList />.
 */

import React, { useState } from "react";
import Modal from "../Modal";
import { MedicationType } from "@healthgent/server/src/lib/api_types";
import { Form, Formik } from "formik";
import { TextInput } from "@healthgent/common";

interface Props {
  medication?: MedicationType;
  onClose: () => any;
  saveMedication: (m: MedicationType) => Promise<any>;
}

const MedicationEditModal: React.FC<Props> = ({
  medication,
  onClose,
  saveMedication,
}) => {
  const [error, setError] = useState("");
  return (
    <Modal onClose={onClose}>
      <div className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Edit Medication
      </div>
      <Formik
        initialValues={{
          name: medication?.name || "",
          dosage: medication?.dosage || "",
          frequency: medication?.frequency || "",
        }}
        validate={(values) => { }}
        onSubmit={(values) => {
          saveMedication(values)
            .then(onClose)
            .catch((e) => setError(e.toString()));
        }}
      >
        <Form className="">
          <TextInput type="text" label="Name" name="name" />
          <TextInput type="text" label="Dosage" name="dosage" />
          <TextInput type="text" label="Frequency" name="frequency" />
          <button type="submit" className="mt-2 primary-button-blue">
            Save
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default MedicationEditModal;
