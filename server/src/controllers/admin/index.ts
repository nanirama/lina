/**
 * Most key admin operations relating to users/patients. Provider specific
 * ones are in provider.ts
 */

import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import {
  updatePhone as setPhone,
  updateEmail as setEmail,
  updateBirthdate,
} from "../../logic/user";
import { updateAddress as setAddress } from "../../logic/address";
import {
  updateEmergencyContact,
  getUser,
  getPatient,
  updateProvidersForPatient,
} from "../../logic/patient";
import {
  createInitialTreatRecord,
  setPharmacyForPatient,
  setResidenceForPatient,
} from "../../logic/pharmacy";
import { Patient } from "../../models/patient";
import { Appointment } from "../../models/appointment";
import { BadRequestError, NotFoundError } from "../../utils/errors";
import {
  cancelAppointment,
  completeAppointment,
  confirmAppointment,
  _bookAppointment,
} from "../../logic/appointments";
import { verifyPatient } from "../../logic/verification";
import { sendResetEmail } from "../../logic/password_reset";
import { User } from "../../models/user";
import { findPharmacies, getPharmacyInfo } from "../../lib/treat";
import { getPatientOnboardingStatus } from "../../logic/onboarding";
import { ProviderSlot } from "../../models/provider_slot";
import { Provider } from "../../models/provider";

import { sendOpsNotificationDigest } from "../../logic/cron/jobs";

import { sendTemplate } from "../../lib/sendgrid";

export * from "./provider";
export * from "./patient";
export * from "./reports";

const MIN_SLOT_DURATION = 15;

export const sendPasswordReset = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    throw new NotFoundError("Invalid user ID");
  }
  const user = await User.query().findById(userId);
  await sendResetEmail(user.email);

  res.json({ success: true });
};

export const verifyId = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  if (!patientId) {
    throw new NotFoundError("Invalid patient ID");
  }
  const patient = await Patient.query()
    .findById(patientId)
    .withGraphFetched({ user: { patient: true } });

  const { inquiryId } = req.body;
  if (!inquiryId) {
    throw new BadRequestError("Must provide inquiry ID");
  }

  await verifyPatient(patient.user, inquiryId);

  res.json({});
};

export const getOnboardingStatus = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  if (!patientId) {
    throw new NotFoundError("Invalid patient ID");
  }
  // TODO(sbb): this is so dumb
  const patient = await Patient.query()
    .findById(patientId)
    .withGraphFetched({ user: { patient: true } });

  const onboardingStatus = await getPatientOnboardingStatus(patient.user);
  res.json({ ...onboardingStatus });
};

export const updatePatient = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  if (!patientId) {
    throw new NotFoundError("Invalid patient ID");
  }
  const patient = await getPatient(patientId);
  const user = patient.user;

  if (req.body.phone != user.phone) {
    await setPhone(user, req.body.phone);
  }
  if (req.body.email != user.email) {
    await setEmail(user, req.body.email);
  }
  if (req.body.birthdate) {
    const birthdate = new Date(req.body.birthdate);
    await updateBirthdate(user, birthdate.toISOString());
  }
  if (req.body.pharmacyId) {
    await setPharmacyForPatient(patient, req.body.pharmacyId);
  }
  if (req.body.residenceState) {
    await setResidenceForPatient(patient, req.body.residenceState);
  }
  if (req.body.providerIds) {
    const providers = await Provider.query()
      .whereIn("id", req.body.providerIds)
      .withGraphFetched({ user: true });
    if (!providers) {
      throw new BadRequestError("Invalid provider ID list");
    }
    await updateProvidersForPatient(patient, providers);
  }
  res.json({ success: true });
};

export const updatePatientAddress = async (req: Request, res: Response) => {
  await check("streetAddress", "Street address is required")
    .isString()
    .run(req);
  await check("city", "City is required").isString().run(req);
  await check("state", "State is required").isString().run(req);
  await check("zip", "Zip code is required").isString().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  const { patientId } = req.params;
  const { streetAddress, unitNumber, city, state, zip } = req.body;
  const user = await getUser(patientId);
  await setAddress(user, {
    streetAddress,
    unitNumber,
    city,
    state,
    zip,
  });
  res.json({ success: true });
};

export const updatePatientEmergencyContact = async (
  req: Request,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  const { patientId } = req.params;
  const { firstName, lastName, relationship, phoneNumber } = req.body;
  await updateEmergencyContact(
    patientId,
    firstName,
    lastName,
    relationship,
    phoneNumber
  );
  res.json({ success: true });
};

export const updatePatientPhone = async (req: Request, res: Response) => {
  await check("phone", "Phone is not valid").isMobilePhone("en-US").run(req);
  await check("patientId", "Patient ID required").isUUID().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  const { patientId } = req.params;
  const { phone } = req.body;
  const user = await getUser(patientId);
  await setPhone(user, phone);

  res.json({ success: true });
};

export const updatePatientEmail = async (req: Request, res: Response) => {
  await check("email", "Email is not valid").isEmail().run(req);
  await check("patientId", "Patient ID required").isUUID().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  const { patientId } = req.params;
  const { email } = req.body;
  const user = await getUser(patientId);
  await setEmail(user, email);
  res.json({ success: true });
};

export const sendPatientReschedulePrompt = async (
  req: Request,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  const { patientId } = req.params;
  const user = await getUser(patientId);

  await sendTemplate(
    user.email,
    "Lina Reschedule Appointment",
    "rescheduleAppointmentPrompt",
    {
      first_name: user.firstName,
    }
  );

  res.json({ success: true });
};

export const createTreatRecord = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  const patient = await Patient.query().findById(patientId);
  if (!patient) {
    throw new NotFoundError("Invalid Patient ID");
  }
  await createInitialTreatRecord(patient);
  res.json({ success: true });
};

export const markAppointmentConfirmed = async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  const appointment = await Appointment.query().findById(appointmentId);
  if (!appointment) {
    throw new NotFoundError("Invalid Appointment ID");
  }
  await confirmAppointment(appointment);
  res.json({ success: true });
};

export const markAppointmentCanceled = async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  const { removeAvailability } = req.body;
  const appointment = await Appointment.query().findById(appointmentId);
  if (!appointment) {
    throw new NotFoundError("Invalid Appointment ID");
  }
  const providerSlotId = appointment.providerSlotId;
  await cancelAppointment(appointment);
  if (removeAvailability) {
    await ProviderSlot.query().deleteById(providerSlotId as string);
  }
  res.json({ success: true });
};

export const markAppointmentComplete = async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  const appointment = await Appointment.query().findById(appointmentId);
  if (!appointment) {
    throw new NotFoundError("Invalid Appointment ID");
  }
  await completeAppointment(appointment);
  res.json({ success: true });
};

export const deleteProviderSlot = async (req: Request, res: Response) => {
  const { slotId } = req.params;
  const providerSlot = await ProviderSlot.query().findById(slotId);
  if (!providerSlot) {
    throw new NotFoundError("Invalid Provider Slot ID");
  }
  if (providerSlot.taken) {
    throw new BadRequestError(
      "Can not delete a timeslot with booked appointment"
    );
  }
  await ProviderSlot.query().deleteById(providerSlot.id);
  res.json({ success: true });
};

export const pharmacySearch = async (req: Request, res: Response) => {
  const { zip } = req.query;
  const results = await findPharmacies({ zip: zip as string });
  res.json({ success: true, results });
};

export const getPharmacy = async (req: Request, res: Response) => {
  const { pharmacyId } = req.params;
  const data = await getPharmacyInfo(pharmacyId);
  res.json({ success: true, ...data });
};

export const scheduleAppointment = async (req: Request, res: Response) => {
  console.log("scheduleAppointment", req.params);
  //get patientId from the query string
  const { patientId, slotId, startTime, endTime } = req.body;
  if (!patientId) {
    throw new NotFoundError("Invalid patient ID");
  }
  const patient = await Patient.query()
    .findById(patientId)
    .withGraphFetched({ user: { patient: true } });

  await check("slotId", "Time slot required").isUUID().run(req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }

  if (startTime && endTime) {
    console.log(
      "startTime & endTime found, will resize slot accordingly and create new one with remaining time",
      startTime,
      endTime
    );
    const start = new Date(startTime);
    const end = new Date(endTime);
    //check startTime & endTime fits in Slot
    const slot = await ProviderSlot.query().findById(slotId);

    if (start < slot.slotStart || end > slot.slotEnd) {
      throw new BadRequestError("Time slot is not valid");
    }

    //resize slot to match startTime & endTime
    const uId = await ProviderSlot.query().patchAndFetchById(slotId, {
      slotStart: start,
      slotEnd: end,
    });
    const remainingMinutes = slot.slotEnd.getMinutes() - end.getMinutes();

    if (remainingMinutes >= MIN_SLOT_DURATION) {
      //create a new slot with the remaining minutes
      await ProviderSlot.query().insert({
        providerId: slot.providerId,
        slotDate: slot.slotDate,
        slotEnd: slot.slotEnd,
        slotStart: end,
      });
    }
  }

  await _bookAppointment(patient.user, patient, slotId);
  res.json({ success: true });
};

export const getAppVersion = async (req: Request, res: Response) => {
  res.json({ version: process.env.npm_package_version || "1.0.5" });
};

export const triggerSendOpsNotificationDigest = async (
  req: Request,
  res: Response
) => {
  await sendOpsNotificationDigest();
  res.json({ success: true });
};
