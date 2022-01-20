import { EmergencyContact } from "../../models/emergency_contact";

export const createEmergencyContact = async (override: any = {}) => {
  return EmergencyContact.query().insertGraphAndFetch({
    firstName: "Aguinaldo",
    lastName: "Faccio",
    relationship: "Father",
    phoneNumber: "305673820349",
    ...override,
  });
};
