/**
 * Shows the list of medications the patient is taking.
 */

import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "../table";
import { MedicationType } from "@healthgent/server/src/lib/api_types";
import MedicationEditModal from "./MedicationEditModal";

interface Props {
  medications: Array<MedicationType>;
  updateMedication: (medication: MedicationType) => Promise<unknown>;
  addMedication: (medications: MedicationType) => Promise<unknown>;
  showAdd?: boolean;
}

const MedicationList: React.FC<Props> = ({
  medications,
  addMedication,
  updateMedication,
  showAdd = true,
}) => {
  const [modal, setModal] = useState<React.ReactElement>();

  const closeModal = () => setModal(undefined);
  const showEditModal = (medication?: MedicationType) => {
    const saveMedication = medication ? updateMedication : addMedication;
    setModal(
      <MedicationEditModal
        onClose={closeModal}
        medication={medication}
        saveMedication={(m) => saveMedication(m).then(closeModal)}
      />
    );
  };
  return (
    <TableContainer>
      {modal}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Medication</TableCell>
            <TableCell className="flex items-center">
              Edit
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="ml-auto w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg> */}
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medications.map((m) => (
            <TableRow key={`medication-${m.id}`}>
              <TableCell>
                <span className="text-lg font-bold">{m.name}</span>
                <span className="ml-2 text-sm text-gray-500">{m.dosage}</span>
              </TableCell>
              <TableCell>
                <a
                  href="#"
                  className="text-xs underline hover:no-underline"
                  onClick={() => showEditModal(m)}
                >
                  Edit
                </a>
              </TableCell>
            </TableRow>
          ))}

          {medications.length === 0 ? (
            <TableRow>
              <TableCell>No medications specified</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ) : null}
          {showAdd ? (
            <TableRow>
              <TableCell>
                <button
                  className="underline hover:no-underline"
                  onClick={() => showEditModal()}
                >
                  Add medication
                </button>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MedicationList;
