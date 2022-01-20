/**
 * Logic relating to external providers, e.g. therapists and PCPs
 */
import {
  ExternalProvider,
  ExternalPractitionerType,
} from "../models/external_provider";
import { Patient } from "../models/patient";

export const addExternalProvider = async (
  patient: Patient,
  practitionerType: ExternalPractitionerType,
  name: string,
  phone?: string
) => {
  return await ExternalProvider.query().insert({
    name,
    practitionerType,
    phone,
    patientId: patient.id,
  });
};

export const setSharingPreferences = async (
  patient: Patient,
  practitionerType: ExternalPractitionerType,
  allowSharing: boolean
) => {
  if (practitionerType === "THERAPIST") {
    return await patient.$query().patch({ shareTherapist: allowSharing });
  } else if (practitionerType === "PCP") {
    return await patient.$query().patch({ sharePcp: allowSharing });
  }
};
