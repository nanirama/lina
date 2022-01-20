import Medication from "../../models/chart/medication";

export const createMedication = async (override: any = {}) => {
  return Medication.query().insertGraphAndFetch({
    name: "Dipirona",
    homeMedication: true,
    dosage: "5mg",
    frequency: "4h",
    active: true,
    ...override,
  });
};
