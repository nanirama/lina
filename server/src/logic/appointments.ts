/**
 * All appointment related logic
 */
import {DateTime} from "luxon";
import {
  Appointment,
  AppointmentChecklist,
  AppointmentStatus,
  AppointmentType,
} from "../models/appointment";
import { Patient } from "../models/patient";
import { User } from "../models/user";
import { ProviderSlot } from "../models/provider_slot";
import { Provider } from "../models/provider";
import {
  sendAdminBookingNotification,
  sendPatientBookingCancellation,
  sendPatientBookingConfirmation,
  sendProviderBookingNotification,
} from "./notifications";
import { sendSurvey } from "../lib/promoter";
import addMinutes from "date-fns/addMinutes";
import addDays from "date-fns/addDays";
import addHours from "date-fns/addHours";
import { BadRequestError } from "../utils/errors";
import logger from "../config/logger";
import { queueAppointmentReminders } from "../async/notifications";
import { differenceInMinutes } from "date-fns";
import { createAppointmentRoom } from "../lib/daily";
import { getSlotLength } from "./provider";
import { createPatientAppointmentRecord } from "./pharmacy";
import { ProviderPatientMap } from "../models/provider_patient_map";

export const MIN_INITIAL_APPOINTMENT_LENGTH = 45;
export const MAX_DAYS_AVAILABILITY = 90;

/**
 *
 * @param patient Patient model
 * @returns initial if the patient hasn't done a visit, follow-up otherwise
 */
export const getNextAppointmentType = async (
  patient: Patient
): Promise<AppointmentType> => {
  const pastAppointment = await Appointment.query()
    .where({ patientId: patient.id })
    .andWhere("startTime", "<", new Date())
    .withGraphFetched({ providerSlot: true })
    .first();

  if (pastAppointment) {
    return "FOLLOW_UP";
  }
  return "INITIAL";
};

/**
 *
 * Book appointment for a patient
 * @param user Patient's user model
 * @param patient Patient model
 * @param timeSlotId ID for a `ProviderSlot`
 * @returns Appointment model
 */
export const bookAppointment = async (
  user: User,
  patient: Patient,
  timeSlotId: string
): Promise<Appointment> => {
  const nextAppointmentType = await getNextAppointmentType(patient);
  if (nextAppointmentType === "FOLLOW_UP") {
    return bookFollowupAppointment(user, patient, timeSlotId);
  } else {
    return _bookAppointment(user, patient, timeSlotId);
  }
};

export const _bookAppointment = async (
  user: User,
  patient: Patient,
  timeSlotId: string
): Promise<Appointment> => {
  const [appointment, slot] = await ProviderSlot.transaction(async (tx) => {
    const providerSlot = await ProviderSlot.query(tx)
      .findById(timeSlotId)
      .withGraphFetched({ provider: { user: true } });
    if (!providerSlot) {
      throw new BadRequestError("Invalid provider slot");
    }
    if (providerSlot.taken) {
      throw new BadRequestError("Slot already taken");
    }

    const existingAppointment = await Appointment.query(tx)
      .where({ patientId: patient.id })
      .whereIn("status", ["PENDING", "CONFIRMED"])
      .withGraphFetched({ providerSlot: true })
      .first();

    await ProviderSlot.query(tx).patchAndFetchById(providerSlot.id, {
      taken: true,
    });

    let appointment = null;
    if (!existingAppointment) {
      const room = await createAppointmentRoom(providerSlot.slotEnd);
      appointment = await providerSlot
        .$relatedQuery<Appointment>("appointment", tx)
        .insert({
          patientId: patient.id,
          providerId: providerSlot.providerId,
          providerSlotId: providerSlot.id,
          status: "PENDING",
          startTime: providerSlot.slotStart,
          endTime: providerSlot.slotEnd,
          url: room.url,
        });
      if (patient.treatUid) {
        await createPatientAppointmentRecord(patient, appointment);
      }
    } else {
      // TODO(sbb): This isn't a great solution
      await existingAppointment.providerSlot
        ?.$query(tx)
        .patch({ taken: false });
      appointment = await existingAppointment.$query(tx).patchAndFetch({
        providerSlotId: providerSlot.id,
        status: "PENDING",
        providerId: providerSlot.providerId,
        startTime: providerSlot.slotStart,
        endTime: providerSlot.slotEnd,
      });
    }
    const existingMapping = await ProviderPatientMap.query(tx)
      .where({ patientId: patient.id, providerId: providerSlot.providerId })
      .first();
    if (!existingMapping) {
      // returning("*") is necessary for Objection when there's no id col
      await ProviderPatientMap.query()
        .insert({
          patientId: patient.id,
          providerId: providerSlot.providerId,
        })
        .returning("*");
    }
    return [appointment, providerSlot];
  });

  // the only step post-payment we care about before sending a notif
  if (patient.personaInquiryId) {
    const provider = slot.provider;
    sendPatientBookingConfirmation(
      user.email,
      user.phone,
      user.firstName,
      provider.user.fullName(),
      appointment.startTime,
      appointment.url || provider.doxyLink,
      user.timezone
    );
  }
  sendAdminBookingNotification(appointment);
  await queueAppointmentReminders(appointment);
  return appointment;
};
/**
 *
 * book follow-up appointment for a patient
 * @param user Patient's user model
 * @param patient Patient model
 * @param timeSlotId ID for a `ProviderSlot`
 * @returns Appointment model
 */
export const bookFollowupAppointment = async (
  user: User,
  patient: Patient,
  timeSlotId: string
): Promise<Appointment> => {
  const providerSlot = await ProviderSlot.query()
    .findById(timeSlotId)
    .withGraphFetched({ provider: true });
  const provider = providerSlot.provider;
  if (!providerSlot) {
    throw new BadRequestError("No provider availability at the time specified");
  }

  if (providerSlot?.appointment) {
    throw new BadRequestError(
      "There is an existing appointment for the time specified"
    );
  }

  const followUpAppointmentLength = getSlotLength(
    provider.employeeType,
    "FOLLOW_UP"
  );

  const cutoffPoint = addMinutes(
    providerSlot.slotStart,
    followUpAppointmentLength
  );
  if (
    differenceInMinutes(providerSlot.slotEnd, providerSlot.slotStart) >
    followUpAppointmentLength
  ) {
    const { slotDate, slotEnd, providerId } = providerSlot;
    await ProviderSlot.query().insert({
      providerId,
      slotDate,
      slotEnd,
      slotStart: cutoffPoint,
    });
    await providerSlot.$query().patchAndFetch({
      slotEnd: cutoffPoint,
    });
  }

  return _bookAppointment(user, patient, providerSlot.id);
};

/**
 *
 * @param patient Patient model
 * @returns Array of upcoming appointments for the patient
 */
export const getUpcomingPatientAppointments = async (
  patient: Patient
): Promise<Array<Appointment>> => {
  const now = DateTime.now().startOf("day");
  const latest = DateTime.now().plus({ days: MAX_DAYS_AVAILABILITY });
  return Appointment.query()
    .joinRelated("providerSlot")
    .where({ "appointments.patientId": patient.id })
    .whereIn("appointments.status", ["CONFIRMED", "PENDING"])
    .withGraphFetched({ providerSlot: true, provider: { user: true } })
    .whereBetween("providerSlot.slotDate", [now, latest]);
};

/**
 *
 * @param provider Provider model
 * @returns Array of upcoming appointments for the provider
 */
export const getUpcomingProviderAppointments = async (
  provider: Provider
): Promise<Array<Appointment>> => {
  const past2Days = DateTime.now().startOf("day").minus({ days: 2 });
  const latest = DateTime.now().plus({ days: MAX_DAYS_AVAILABILITY });
  return Appointment.query()
    .joinRelated("providerSlot")
    .where({
      "appointments.providerId": provider.id,
      "appointments.status": "CONFIRMED",
    })
    .withGraphFetched({ providerSlot: true, patient: { user: true } })
    .whereBetween("providerSlot.slotDate", [past2Days, latest]);
};

/**
 *
 * @param state state abbreviation (NY, CA, TX, etc)
 * @param appointmentType initial or follow up
 * @param providerId provider ID if looking for a specific provider's slots
 * @returns available slots
 */
export const getAvailableSlots = async (
  state: string,
  appointmentType: AppointmentType,
  providerId?: string
): Promise<{
  slots: Array<ProviderSlot>;
  providers: Array<Provider>;
}> => {
  // TODO(sbb): Change this to provider preference on lead time
  const earliest = DateTime.now().startOf("day").plus({ hours: 24 });
  const latest = DateTime.now().plus({ days: MAX_DAYS_AVAILABILITY });

  const results = providerId
    ? await ProviderSlot.query()
        .where({
          taken: false,
          providerId,
        })
        .whereBetween("slotDate", [earliest, latest])
    : await ProviderSlot.query()
        .joinRelated({ provider: { licenses: true } })
        .where("provider:licenses.state", state)
        .andWhereBetween("slotDate", [earliest, latest])
        .andWhere({
          taken: false,
        });

  const slotLength = (s: ProviderSlot) =>
    differenceInMinutes(new Date(s.slotEnd), new Date(s.slotStart));
  const slots =
    appointmentType === "INITIAL"
      ? results.filter((s) => slotLength(s) >= MIN_INITIAL_APPOINTMENT_LENGTH)
      : results;
  const providerIds = slots.map((s) => s.providerId);
  const providers = await Provider.query()
    .whereIn("id", providerIds)
    .withGraphFetched("user");
  return { slots, providers };
};

/**
 *
 * @param appointmentId ID for appointment model
 * @returns appointment model, with patient data joined to the object
 */
export const getAppointmentForProvider = async (appointmentId: string) => {
  const appointment = await Appointment.query()
    .findById(appointmentId)
    .joinRelated("providerSlot")
    .withGraphFetched("[providerSlot, patient.[user, licenseFile], note]");
  return { ...appointment, ...appointment.data };
};

/**
 *
 * @param appointmentId ID for appointment model
 * @param status Appointment status
 * @returns Updated appointment
 */
export const updateAppointmentStatus = async (
  appointmentId: string,
  status: AppointmentStatus
) => {
  return Appointment.query().patchAndFetchById(appointmentId, { status });
};

/**
 *
 * @param appointmentId ID for the appointment model
 * @param checklist mapping of task to whether it's been completed for the appointment
 * @returns Up to date appointment with checklist data
 */
export const updateAppointmentChecklist = async (
  appointmentId: string,
  checklist: AppointmentChecklist
) => {
  return Appointment.query().patchAndFetchById(appointmentId, {
    data: { checklist },
  });
};

/**
 * Get all past appointments for a patient
 */
export const getPreviousAppointments = async (patient: Patient) => {
  const now = DateTime.now().startOf("day");
  return Appointment.query()
    .where({ patientId: patient.id })
    .whereIn("status", ["COMPLETED", "CANCELED"])
    .where("startTime", "<", now)
    .withGraphFetched({ provider: { user: true } });
};

/**
 * Confirms appointment, sends notification to provider indicating a new
 * booking
 */
export const confirmAppointment = async (appointment: Appointment) => {
  logger.info(`Marking appointment ${appointment.id} as confirmed`);
  await appointment.$query().patch({ status: "CONFIRMED" });
  await sendProviderBookingNotification(appointment);
};

/**
 * Marks appointment as cancelled, sends cancellation notice to patient
 */
export const cancelAppointment = async (appointment: Appointment) => {
  logger.info(`Marking appointment ${appointment.id} as cancelled`);
  if (appointment.status === "CANCELED") {
    logger.warn(`Appointment ${appointment.id} already canceled`);
    return;
  }
  await ProviderSlot.transaction(async (tx) => {
    await ProviderSlot.query(tx).patchAndFetchById(
      appointment.providerSlotId as string,
      { taken: false }
    );
    await appointment
      .$query(tx)
      .patch({ status: "CANCELED", providerSlotId: null });
  });

  const patient = await Patient.query()
    .findById(appointment.patientId)
    .withGraphFetched({ user: { patient: true } });

  await sendPatientBookingCancellation(
    patient.user.email,
    patient.user.phone,
    patient.user.firstName,
    appointment.startTime,
    patient.user.timezone
  );
};

/**
 * Marks appointment as complete, sends survey to the patient
 */
export const completeAppointment = async (appointment: Appointment) => {
  logger.info(`Marking appointment ${appointment.id} as complete`);
  if (appointment.status === "COMPLETED") {
    logger.warn(
      `skipping marking appointment ${appointment.id} as complete since it is already completed`
    );
    return;
  }
  await appointment.$query().patch({ status: "COMPLETED" });
  const patient = await Patient.query()
    .findById(appointment.patientId)
    .withGraphFetched({ user: true });
  const { email, firstName, lastName } = patient.user;
  await sendSurvey(email, firstName, lastName);
};
