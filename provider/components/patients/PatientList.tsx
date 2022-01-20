/**
 * Shows a fuzzy-searchable list of patients with links to their charts.
 */
import React, { useState } from "react";
import Link from "next/link";
import { PatientInfo } from "@healthgent/server/src/lib/api_types";
import { formatPhoneNumber, getFormattedBirthdate } from "../../lib/util";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "../table";
import cx from "classnames";
import Fuse from "fuse.js";

interface Props {
  patients: Array<PatientInfo>;
}

const PatientList: React.FC<Props> = ({ patients }) => {
  const [filter, setFilter] = useState("");
  const sortedPatients = patients.sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );
  const keys = sortedPatients.length > 0 ? Object.keys(sortedPatients[0]) : [];
  const fuse = new Fuse(sortedPatients, { keys, includeScore: true });
  const patientList = filter
    ? fuse
      .search(filter)
      .filter((x) => (x.score || 0) < 0.05)
      .map((x) => x.item)
    : sortedPatients;

  return (
    <div className="h-screen overflow-y-scroll p-1">
      <input
        type="text"
        placeholder="Search"
        className="w-72 mb-2 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-400 relative bg-white rounded text-sm"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date of Birth (Age)</TableCell>
              <TableCell>Contact Info</TableCell>
              <TableCell>Relationships</TableCell>
              <TableCell>Manage</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patientList.map((p, idx) => (
              <TableRow
                key={p.patientId}
                className={cx(idx % 2 == 1 ? "bg-gray-50" : "bg-white")}
              >
                <TableCell>{`${p.lastName}, ${p.firstName}`}</TableCell>
                <TableCell>{getFormattedBirthdate(p.birthday)}</TableCell>
                <TableCell>
                  <div className="flex flex-col text-xs">
                    <a
                      href={`tel:${formatPhoneNumber(p.phone)}`}
                      className="hover:underline mb-1"
                    >
                      {p.phone}
                    </a>
                    <a href={`mailto:${p.email}`} className="hover:underline">
                      {p.email}
                    </a>
                  </div>
                </TableCell>
                <TableCell>Clinician: {p.primaryProvider}</TableCell>
                <TableCell>
                  <Link href={`/client/${p.patientId}/overview`}>
                    <button className="secondary-button-blue">
                      View Patient
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PatientList;
