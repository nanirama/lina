/**
 * Page indicating the chart / specific appointment for a patient. The difference
 * between this and the chart alone is showing the checklist of stuff
 * that needs to happen before an appointment, as well as an eRx link
 * that's tied to the appointment itself (vs just the patient profile).
 */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import {
  AppointmentChecklist,
  AppointmentStatus,
  NoteData,
} from "@healthgent/server/src/lib/api_types";
import BaseProviderView from "../../components/core/BaseView";
import {
  createNote,
  getAppointment,
  getPatientChart,
  updateNote,
  updateAppointment,
  updatePsychotherapyNote,
  getTreatToken,
  updateMedication,
  updateAllergy,
  addAllergy,
  addMedication,
} from "../../lib/api";
import NoteEditor from "../../components/appointment/NoteEditor";
import PatientInfo from "../../components/chart/PatientInfo";
import IntakeDisplay from "../../components/chart/IntakeDisplay";
import MedicationList from "../../components/chart/MedicationList";
import AllergyList from "../../components/chart/AllergyList";
import Card from "../../components/Card";
import ChartNotes from "../../components/chart/ChartNotes";
import Button from "../../components/core/Button";
import ChecklistSection from "../../components/appointment/ChecklistSection";

interface Props { }

const AppointmentView: React.FC<Props> = () => {
  const router = useRouter();
  const { appointment_id } = router.query;
  const {
    data: appointment,
    error,
    mutate,
  } = useSWR(appointment_id as string, getAppointment);
  const { data: patient, mutate: mutatePatient } = useSWR(
    appointment?.patientId ?? null,
    getPatientChart
  );
  const { data: treatJwt } = useSWR("treat_token", getTreatToken);
  const [initialNoteState, setInitialNoteState] = useState<NoteData>();

  useEffect(() => {
    if (appointment) {
      setInitialNoteState(appointment.note?.data);
    }
  }, [appointment]);

  if (appointment === undefined || patient === undefined) {
    return <BaseProviderView>Loading appointment...</BaseProviderView>;
  }

  const saveNoteProgress = (data: NoteData, locked?: boolean) => {
    if (!appointment || !patient) {
      return;
    }
    const noteId = appointment.note?.id;
    const mutateNote = () => mutate((d) => ({ ...appointment, note: d?.note }));
    // const mutateNote = () => mutate();
    if (!noteId) {
      return createNote(patient.id, data, appointment.id).then(mutateNote);
    }
    return updateNote(noteId, data, locked)?.then(mutateNote);
  };

  const updateStatus = (status: AppointmentStatus) => {
    updateAppointment(appointment.id, { status }).then(() =>
      mutate((data) => ({
        ...appointment,
        status,
      }))
    );
  };
  const updateChecklist = (checklist: AppointmentChecklist) => {
    updateAppointment(appointment.id, { checklist }).then(() =>
      mutate((data) => ({
        ...appointment,
        checklist,
      }))
    );
  };

  const updateTherapyNote = (content: string) => {
    updatePsychotherapyNote({ appointmentId: appointment.id, content });
  };

  const eprescribeUrl = `${process.env.NEXT_PUBLIC_TREAT_BASE_URL}/#!/app/patient-encounter/${appointment.treatEncounterId}/discharge/patient?next=TREAT&embed=1&jwt=${treatJwt}`;

  return (
    <BaseProviderView>
      <div className="flex h-screen">
        <div className="flex flex-col w-2/3 h-screen space-y-2">
          <PatientInfo clientId={patient.id} {...patient}>
            <a target="_blank" rel="noreferrer" href={eprescribeUrl}>
              <Button>E-prescribe</Button>
            </a>
          </PatientInfo>
          <Card className="flex flex-col space-y-2">
            <span className="text-lg mr-2">Appointment Status</span>
            <select
              className="rounded shadow border solid"
              value={appointment.status}
              onChange={(e) =>
                updateStatus(e.target.value as AppointmentStatus)
              }
            >
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="NO_SHOW">No Show</option>
            </select>
            <span className="text-lg mr-2">
              Have you verified the following?
            </span>
            <ChecklistSection
              clientId={patient.id}
              checklist={appointment.checklist || {}}
              onChange={updateChecklist}
              licensePictureUrl={patient.licensePictureUrl}
              address={patient.address}
            />
          </Card>
          <NoteEditor
            initialState={initialNoteState}
            note={appointment.note}
            updateNote={saveNoteProgress}
          />

          <ChartNotes notes={patient.chart.notes ?? []} />
        </div>
        <div className="flex flex-col w-1/3 ml-4 space-y-2">
          <MedicationList
            medications={patient.medications}
            updateMedication={(medication) =>
              updateMedication(
                patient.id,
                medication.id as number,
                medication
              ).then(() => mutate())
            }
            addMedication={(medication) =>
              addMedication(patient.id, medication).then(() => mutate())
            }
          />
          <AllergyList
            allergies={patient.allergies}
            updateAllergy={(allergy) =>
              updateAllergy(patient.id, allergy.id as number, allergy).then(
                () => mutate()
              )
            }
            addAllergy={(allergy) =>
              addAllergy(patient.id, allergy).then(() => mutate())
            }
          />
          <IntakeDisplay
            intakeResponse={patient.intakeResponse}
            phqScore={patient.intakePhqScore}
            gadScore={patient.intakeGadScore}
          />
        </div>
      </div>
    </BaseProviderView>
  );
};

export default AppointmentView;
