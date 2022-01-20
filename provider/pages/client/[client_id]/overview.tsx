/**
 * This is the patient chart, showing everything
 * relevant for a patient including:
 * - demographic info
 * - contact info
 * - emergency contact
 * - medications
 * - allergies
 * - chart notes
 */

import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import BaseProviderView from "../../../components/core/BaseView";
import ExpandableCard from "../../../components/core/ExpandableCard";
import {
  addAllergy,
  addMedication,
  createNote,
  getPatientChart,
  getTreatToken,
  updateAllergy,
  updateMedication,
} from "../../../lib/api";
import PatientNote from "../../../components/chart/PatientNote";
import MedicationList from "../../../components/chart/MedicationList";
import AllergyList from "../../../components/chart/AllergyList";
import PatientInfo from "../../../components/chart/PatientInfo";
import Button from "../../../components/core/Button";
import IntakeDisplay from "../../../components/chart/IntakeDisplay";
import BasicEditor from "../../../components/chart/BasicEditor";
import { getPrescribeUrl } from "../../../lib/util";

interface Props { }

const defaultNote = { content: "" };

const Overview: React.FC<Props> = () => {
  const router = useRouter();
  const [noteState, setNoteState] = useState(defaultNote);
  const { client_id } = router.query;
  const {
    data: patient,
    error,
    mutate,
  } = useSWR(client_id ?? null, getPatientChart);

  const { data: treatJwt } = useSWR("treat_token", getTreatToken);
  if (!patient) {
    return <BaseProviderView>Loading patient...</BaseProviderView>;
  }
  const addNote = () => {
    return createNote(patient.id, noteState).then(() => {
      setNoteState(defaultNote);
      mutate();
    });
  };
  const eprescribeUrl = getPrescribeUrl(treatJwt || "");

  return (
    <BaseProviderView>
      <div className="flex flex-row">
        <div className="flex flex-col w-2/3 h-screen mr-4 space-y-2">
          <PatientInfo clientId={client_id as string} {...patient}>
            <a target="_blank" rel="noreferrer" href={eprescribeUrl}>
              <Button>E-prescribe</Button>
            </a>
          </PatientInfo>
          <BasicEditor
            onUpdate={(content) => setNoteState({ ...noteState, content })}
            onSubmit={addNote}
          />
          <div className="flex flex-col space-y-2">
            <span className="font-semibold text-lg">Previous notes</span>
            {patient.chart.notes
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((n) => (
                <ExpandableCard
                  key={n.id}
                  title={`Chart Note: ${new Date(
                    n.timestamp
                  ).toDateString()} from ${n.providerName}`}
                >
                  <PatientNote note={n} />
                </ExpandableCard>
              ))}
          </div>
        </div>
        <div className="w-1/3 flex flex-col space-y-2">
          <IntakeDisplay
            intakeResponse={patient.intakeResponse}
            phqScore={patient.intakePhqScore}
            gadScore={patient.intakeGadScore}
          />
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
        </div>
      </div>
    </BaseProviderView>
  );
};

export default Overview;
