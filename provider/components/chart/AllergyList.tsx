/**
 * Shows the list of allergies that the patient has reported.
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
import Badge from "../core/Badge";
import AllergyEditModal from "./AllergyEditModal";

import { AllergyType } from "@healthgent/server/src/lib/api_types";

interface Props {
  allergies: Array<AllergyType>;
  updateAllergy: (allergy: AllergyType) => Promise<unknown>;
  addAllergy: (allergy: AllergyType) => Promise<unknown>;
}

const AllergyList: React.FC<Props> = ({
  allergies,
  addAllergy,
  updateAllergy,
}) => {
  const [modal, setModal] = useState<React.ReactElement>();

  const closeModal = () => setModal(undefined);
  const showEditModal = (allergy?: AllergyType) => {
    const saveAllergy = allergy ? updateAllergy : addAllergy;
    setModal(
      <AllergyEditModal
        onClose={closeModal}
        allergy={allergy}
        saveAllergy={(a) => saveAllergy(a).then(closeModal)}
      />
    );
  };
  return (
    <TableContainer>
      {modal}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Allergy</TableCell>
            <TableCell>Severity</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allergies.map((a) => (
            <TableRow key={`allergy-${a.id}`}>
              <TableCell>
                <span className="text-lg font-bold">{a.name}</span>
                {/* <span className="ml-2 text-sm text-gray-500">20mg</span> */}
              </TableCell>
              <TableCell>
                <Badge type="neutral">{a.severity || "Unknown"}</Badge>
              </TableCell>
              <TableCell>
                <a
                  href="#"
                  className="text-xs underline hover:no-underline"
                  onClick={() => showEditModal(a)}
                >
                  Edit
                </a>
              </TableCell>
            </TableRow>
          ))}
          {allergies.length === 0 ? (
            <TableRow>
              <TableCell>No allergies specified</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ) : null}
          <TableRow>
            <TableCell>
              <a
                className="underline hover:no-underline"
                onClick={() => showEditModal()}
              >
                Add Allergy
              </a>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllergyList;
