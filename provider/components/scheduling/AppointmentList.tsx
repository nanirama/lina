/**
 * Shows a list of upcoming appointments. Used in multiple instances on the home page.
 */
import React from "react";

import { ProviderAppointment } from "@healthgent/server/src/lib/api_types";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "../table";
import Badge from "../core/Badge";

interface Props {
  appointments: Array<ProviderAppointment>;
  noneMsg: string;
  hideName?: boolean;
  hideLink?: boolean;
}

const AppointmentList: React.FC<Props> = ({
  appointments,
  noneMsg,
  hideName,
  hideLink,
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            {!hideName ? <TableCell>Patient</TableCell> : null}
            <TableCell>Status</TableCell>
            {!hideLink ? <TableCell>Links</TableCell> : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((a) => (
            <TableRow key={a.appointmentId}>
              <TableCell>
                {new Date(a.startTime).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(a.startTime).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  hour12: true,
                  minute: "numeric",
                })}
              </TableCell>
              {!hideName ? <TableCell>{a.patientName}</TableCell> : null}
              <TableCell>
                <Badge type="success">{"Confirmed"}</Badge>
              </TableCell>
              {!hideLink ? (
                <TableCell>
                  <a
                    href={`/appointments/${a.appointmentId}`}
                    className="secondary-button-blue w-32"
                  >
                    Patient Chart
                  </a>
                  <a
                    href={a.videoLink}
                    target="_blank"
                    className="secondary-button-blue ml-4"
                    rel="noreferrer"
                  >
                    Video Link
                  </a>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
          {appointments.length === 0 ? (
            <TableRow>
              <TableCell>{noneMsg}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentList;
