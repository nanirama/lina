/**
 * Prescriptions tab on the patient portal, showing Rx info pulled
 * from Treat via the API.
 */
import React from "react";
import BasePatientPortalView from "../../components/patient_portal/BasePatientPortalView";
import useSWR from "swr";
import { getPrescriptions } from "../../lib/api";
import PrescriptionIntroCard from "../../components/patient_portal/PrescriptionIntroCard";
import PrescriptionCard from "../../components/patient_portal/PrescriptionCard";

interface Props { }

const Prescriptions: React.FC<Props> = () => {
  const { data: prescriptions, error } = useSWR(
    "get_prescriptions",
    getPrescriptions
  );

  if (prescriptions === undefined && !error) {
    return <BasePatientPortalView>Loading...</BasePatientPortalView>;
  }
  if (!prescriptions || prescriptions.length === 0) {
    return (
      <BasePatientPortalView>
        <PrescriptionIntroCard />
      </BasePatientPortalView>
    );
  }

  return (
    <BasePatientPortalView>
      <div className="text-center text-xl font-semibold">
        Your prescriptions
      </div>
      <div className="text-sm text-center text-blueGray-500"></div>
      <div className="flex flex-col space-y-4 mt-4">
        {prescriptions.map((p) => (
          <PrescriptionCard
            key={`${p.drugName} ${p.status} ${p.totalRefills}`}
            {...p}
          />
        ))}
      </div>
    </BasePatientPortalView>
  );
};

export default Prescriptions;
