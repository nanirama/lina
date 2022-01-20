/**
 * UNUSED COMPONENT
 * feel free to delete
 */
import React, { useState } from "react";
import useSWR from "swr";
import { getPatients, scheduleAppointment } from "../../lib/api";
import Modal from "../Modal";
import Button from "../core/Button";

interface Props {
  closeModal: () => void;
}

const ClientSchedule: React.FC<Props> = ({ closeModal }) => {
  const { data } = useSWR("client_schedule", getPatients);
  const [patientId, setPatientId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointmentLength, setAppointmentLength] = useState(20);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const patients = data;
  if (!patients) {
    return <div>Loading...</div>;
  }

  const selectPatient = (name: string, id: string) => {
    setPatientId(id);
    setName(name);
  };

  const updateValue = (name: string) => {
    setName(name);
    setPatientId("");
  };

  const updateTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const roundMinutes = `${(Math.round(parseInt(minutes) / 30) * 30) % 60}`;
    const newTime = `${hours}:${roundMinutes.padStart(2, "0")}`;
    setTime(newTime);
  };

  const submit = () => {
    const apptTime = new Date(`${date} ${time}`);
    setProcessing(true);
    scheduleAppointment(
      patientId,
      date,
      apptTime.toISOString(),
      appointmentLength
    )
      .then(closeModal)
      .catch((e) => setError(e.toString()))
      .finally(() => setProcessing(false));
  };

  const suggestions = patients.filter(
    (p) =>
      !patientId && name && p.name.toLowerCase().includes(name.toLowerCase())
  );

  const buttonDisabled = processing || !patientId || !date || !time;

  return (
    <Modal onClose={closeModal}>
      <div className="flex flex-col">
        <div className="flex flex-col justify-start mb-2 h-96 text-center ">
          <h1 className="text-xl mb-2 font-semibold">Schedule a follow up</h1>
          <input
            className="border solid border-gray-400 rounded-lg focus:ring-2 ring-gray-200 outline-none p-2 w-full"
            type="text"
            placeholder="Patient Name"
            value={name}
            onChange={(e) => updateValue(e.target.value)}
          />
          {suggestions.length > 0 ? (
            <div className="flex flex-col mt-1 max-h-48 overflow-scroll">
              {suggestions.map((p) => (
                <div
                  className="w-full p-1 hover:bg-gray-200 border"
                  key={p.patientId}
                  onClick={() => selectPatient(p.name, p.patientId)}
                >
                  {p.name}
                </div>
              ))}
            </div>
          ) : null}

          <div className="flex mt-4">
            <input
              className="border solid border-gray-400 rounded-lg focus:ring-2 ring-gray-200 outline-none p-2 w-full"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              className="ml-1 border solid border-gray-400 rounded-lg focus:ring-2 ring-gray-200 outline-none p-2 w-full"
              type="time"
              value={time}
              onChange={(e) => updateTime(e.target.value)}
            />
            <select
              value={appointmentLength}
              onChange={(e) => setAppointmentLength(parseInt(e.target.value))}
              className="ml-1 border solid border-gray-400 rounded-lg focus:ring-2 ring-gray-200 outline-none p-2 w-full"
            >
              <option value="20">20 minutes</option>
              <option value="45">45 minutes</option>
            </select>
          </div>
          {error ? (
            <div className="text-red-500 mt-2 text-lg">{error}</div>
          ) : null}
          <Button disabled={buttonDisabled} onClick={submit}>
            Schedule
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ClientSchedule;
