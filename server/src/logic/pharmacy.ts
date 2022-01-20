/**
 * Logic related to patient pharmacy records. See lib/treat for
 * Treat API usage.
 */
import { Patient } from "../models/patient";
import * as treatApi from "../lib/treat";
import Logger from "../config/logger";
import { Appointment } from "../models/appointment";
import { getUpcomingPatientAppointments } from "./appointments";
import { CreateOrUpdateUserParams } from "../lib/treat/types";

export interface Prescription {
  name: string;
  status: string;
  drugName: string;
  quantity: number;
  units: string;
  duration: number;
  totalRefills: number;
  dosage: string;
}

const patientToTreatRecord = async (
  patient: Patient,
  activeFlag?: boolean
): Promise<CreateOrUpdateUserParams> => {
  const completePatient = await patient
    .$query()
    .withGraphFetched({ user: { address: true } });
  const { firstName, lastName, email, phone, address, birthdate } =
    completePatient.user;
  return {
    mrn: patient.id,
    firstName,
    lastName,
    email,
    dateOfBirth: birthdate.toISOString(),
    // Their API only accepts all caps for this
    gender: patient.gender.toUpperCase() || "FEMALE",
    mobileNumber: phone.replace("+1", "").replace(/\D/g, ""),
    street: address?.streetAddress as string,
    city: address?.city as string,
    state: address?.state as string,
    zip: address?.zip as string,
    pharmacyId: patient.treatPharmacyId,
    activeFlag: activeFlag,
  };
};

export const createPatientPharmacyRecord = async (patient: Patient) => {
  const treatRecord = await patientToTreatRecord(patient);
  return await treatApi
    .createPatient(treatRecord)
    .then((r) => `${r.uid}`)
    .catch((e) => {
      Logger.warn(`Could not create patient Treat record: ${e.toString()}`);
      return "";
    });
};

export const createPatientAppointmentRecord = async (
  patient: Patient,
  appointment: Appointment
) => {
  const treatEncounterId = await treatApi
    .createEncounter({
      appointmentId: appointment.id,
      treatUid: patient.treatUid,
      appointmentDate: appointment.startTime,
    })
    .catch((e) => {
      Logger.warn(
        `Could not create patient encounter for patient id ${patient.id
        }, treat uid: ${patient.treatUid}. Err: ${e.toString()}`
      );
      return "";
    });
  await appointment.$query().patch({ treatEncounterId });
};

export const createInitialTreatRecord = async (patient: Patient) => {
  if (!patient.treatUid) {
    const treatUid = await createPatientPharmacyRecord(patient);
    await patient.$query().patch({ treatUid });
  }
  const appointments = await getUpcomingPatientAppointments(patient);
  if (appointments.length > 0 && !appointments[0].treatEncounterId) {
    await createPatientAppointmentRecord(patient, appointments[0]);
  }
};

export const getPrescriptionsForPatient = async (
  patient: Patient
): Promise<Array<Prescription>> => {
  const rxOrders = await treatApi.getRxOrdersForPatient(patient.treatUid);
  return rxOrders.map((o) => ({
    name: o.ordDrugName,
    status: o.ordStatus,
    dosage: o.ordDosage,
    drugName: o.ordDrugName,
    quantity: o.ordQty,
    units: o.ordDispUnits,
    duration: o.ordDuration,
    totalRefills: o.ordRefills,
  }));
};

export const setPharmacyForPatient = async (
  patient: Patient,
  pharmacyId: string
) => {
  const treatPharmacyId =
    pharmacyId === "mail-order"
      ? `${treatApi.MAIL_ORDER_PHARMACY_ID}`
      : pharmacyId;
  await patient.$query().patch({ treatPharmacyId });
};

export const setResidenceForPatient = async (
patient: Patient,
residenceState: string
) => {
  console.log("setResidenceForPatient",residenceState)
  await patient.$query().patch({ residenceState });
};

export const syncPatientsActiveStatus = async () => {
  let numActive = 0;
  let numInactive = 0;

  if (process.env.NODE_ENV !== "production") {
    return { numActive, numInactive };
  }
  const patients = await Patient.query().whereNotNull("treatUid");

  patients.forEach(async (patient) => {
    if (!patient.treatUid) {
      return;
    }
    const isActive = patient.subscriptionStatus === "ACTIVE";
    if (isActive) {
      numActive += 1;
    } else {
      numInactive += 1;
    }
    const treatRecord = await patientToTreatRecord(patient, isActive);
    await treatApi.updatePatient(patient.treatUid, treatRecord);
  });

  return { numActive, numInactive };
};
