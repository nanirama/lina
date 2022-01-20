/**
 * Shows a searchable client list for the physician
 */
import React, { useEffect, useState } from "react";
import { PatientInfo } from "@healthgent/server/src/lib/api_types";
import BaseProviderView from "../components/core/BaseView";
import PatientList from "../components/patients/PatientList";
import { getPatients } from "../lib/api";

interface Props { }

const Clients: React.FC<Props> = () => {
  const [patients, setPatients] = useState<Array<PatientInfo>>([]);
  useEffect(() => {
    getPatients().then(setPatients);
  }, []);
  return (
    <BaseProviderView>
      <div className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Patient List
      </div>
      <PatientList patients={patients} />
    </BaseProviderView>
  );
};

export default Clients;
