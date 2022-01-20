/**
 * Core patient related logic
 */
import { Patient } from "../models/patient";
import { EmergencyContact } from "../models/emergency_contact";
import { User } from "../models/user";
import { formatDate } from "../utils/format";
import { getCdnUrl } from "../lib/s3";
import { calculateScores } from "./intake";
import { getPrescriptionsForPatient } from "./pharmacy";
import Medication from "../models/chart/medication";
import { ProviderPatientMap } from "../models/provider_patient_map";
import { Provider } from "../models/provider";
import { sendTemplate } from "../lib/sendgrid";
import { addToOpsNotificationQueue } from "./ops_notification_queue";
import { NotificationTypes } from "../models/ops_notification_queue";
import * as twillio from "../lib/twilio";
import { BadRequestError } from "../utils/errors";

export const getMedications = async (patient: Patient) => {
  const medications = await Medication.query().where({ patientId: patient.id });
  const prescriptions = patient.treatUid
    ? await getPrescriptionsForPatient(patient)
    : [];
  return [...medications, ...prescriptions];
};

export const getPatientChart = async (patientId: string) => {
  const patient = await Patient.query()
    .findById(patientId)
    .withGraphFetched({
      user: { address: true },
      appointments: true,
      notes: { provider: { user: true } },
      emergencyContact: true,
      intakeResponse: true,
      licenseFile: true,
      medications: true,
      allergies: true,
    });

  const { firstName, lastName, email, phone } = patient.user;
  const currentDate = new Date();
  const upcomingAppointments = patient.appointments
    .filter((a) => a.startTime >= currentDate)
    .map((a) => ({
      appointment_id: a.id,
      date: formatDate(a.startTime),
      time: a.startTime,
    }));
  const licensePictureUrl = patient.licenseFile
    ? getCdnUrl(patient.licenseFile.key)
    : "";

  const { allergies } = patient;
  const medications = await getMedications(patient);
  const scores = calculateScores(patient.intakeResponse);

  return {
    id: patient.id,
    name: `${firstName} ${lastName}`,
    gender: patient.gender,
    phone,
    birthday: patient.user.birthdate,
    email,
    upcomingAppointments,
    address: {
      ...patient.user.address,
    },
    emergencyContact: {
      ...patient.emergencyContact,
    },
    adminNote: "none",
    chart: {
      notes: patient.notes.map((n) => ({
        id: n.id,
        data: n.data,
        providerName: n.provider
          ? `${n.provider.user.firstName} ${n.provider.user.lastName}`
          : "Initial intake",
        timestamp: n.updatedAt.getTime(),
      })),
    },
    intakeResponse: patient.intakeResponse?.response,
    intakePhqScore: scores.phqScore,
    intakeGadScore: scores.gadScore,
    licensePictureUrl,
    medications,
    allergies,
  };
};

export const getPatientFromUserId = async (userId: number) => {
  return await User.query()
    .findById(userId)
    .withGraphFetched("[patient, address]");
};

export const getPatient = async (patientId: string) => {
  return await Patient.query()
    .findById(patientId)
    .withGraphFetched({ user: { address: true } });
};

export const getUser = async (patientId: string) => {
  const patient = await Patient.query()
    .findById(patientId)
    .withGraphFetched({ user: true });
  return patient.user;
};

export const updateEmergencyContact = async (
  patientId: string,
  firstName: string,
  lastName: string,
  relationship: string,
  phoneNumber: string
) => {
  const formattedPhone = await twillio.formatPhone(phoneNumber);
  if (!formattedPhone) {
    throw new BadRequestError("Please provide a valid phone number.");
  }
  const emergencyContact = await EmergencyContact.query()
    .where({ patientId })
    .first();
  if (emergencyContact) {
    return await emergencyContact.$query().patch({
      firstName,
      lastName,
      patientId,
      relationship,
      phoneNumber,
    });
  } else {
    return await EmergencyContact.query().insert({
      firstName,
      lastName,
      patientId,
      relationship,
      phoneNumber,
    });
  }
};

/**
 * This will return the latest provider the patient has seen.
 * We should keep the other providers since they may need to reference
 * the chart at some point.
 */
export const getProviderForPatient = async (patient: Patient) => {
  const ppm = await ProviderPatientMap.query()
    .where({ patientId: patient.id })
    .withGraphFetched({ provider: true })
    .orderBy("createdAt", "desc")
    .first();
  return ppm.provider;
};

/**
 *
 * @param patient patient to update
 * @param providers list of providers that have a relationship with the patient
 */
export const updateProvidersForPatient = async (
  patient: Patient,
  providers: Array<Provider>
) => {
  const existingProviders = await ProviderPatientMap.query().where({
    patientId: patient.id,
  });

  const newProviders = providers.filter(
    (p) => !existingProviders.find((ep) => ep.providerId === p.id)
  );
  const removeProviders = existingProviders.filter(
    (ep) => !providers.find((p) => p.id === ep.providerId)
  );

  const removedProviders = await Provider.query()
    .whereIn(
      "id",
      removeProviders.map((p) => p.providerId)
    )
    .withGraphFetched({ user: true });

  const newProviderNames = newProviders.map((p) => p.user.fullName());
  const removedProviderNames = removedProviders.map((p) => p.user.fullName());

  for await (const newProvider of newProviders) {
    await ProviderPatientMap.query()
      .insert({
        providerId: newProvider.id,
        patientId: patient.id,
      })
      .returning("*");

    //send an email to the Provider
    await await sendTemplate(
      newProvider.user.email,
      "Lina Patient Added",
      "changeProvidersProvider",
      {
        first_name: newProvider.user.firstName,
        patient: patient.user.fullName(),
        action: "added",
      }
    );
  }

  for await (const removeProvider of removeProviders) {
    await ProviderPatientMap.query().delete().where({
      providerId: removeProvider.providerId,
      patientId: removeProvider.patientId,
    });
  }

  for await (const rProvider of removedProviders) {
    await await sendTemplate(
      rProvider.user.email,
      "Lina Patient Removed",
      "changeProvidersProvider",
      {
        first_name: rProvider.user.firstName,
        patient: patient.user.fullName(),
        action: "removed",
      }
    );
  }

  if (newProviderNames.length > 0) {
    await sendTemplate(
      patient.user.email,
      "Lina Provider Change",
      "changeProvidersPatient",
      {
        first_name: patient.user.firstName,
        providers: newProviderNames.join(", "),
      }
    );
  }

  let emailToOps = `Patient: ${patient.user.fullName()} has been `;
  if (removedProviderNames.length > 0)
    emailToOps += `removed from Providers: ${removedProviderNames.join(", ")}`;
  if (newProviderNames.length > 0)
    emailToOps += ` and added to Providers: ${newProviderNames.join(", ")}`;

  await addToOpsNotificationQueue(
    emailToOps,
    NotificationTypes.PATIENT_PROVIDER_CHANGE
  );
};
