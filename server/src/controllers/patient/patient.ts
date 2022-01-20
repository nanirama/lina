/**
 * Most patient related endpoints are here. Should be split out further
 */
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import {
  updatePhone as setPhone,
  updateEmail as setEmail,
  updateBirthdate as setBirthdate,
} from "../../logic/user";
import { updateAddress as setAddress } from "../../logic/address";
import { updateEmergencyContact } from "../../logic/patient";
import { updateIntake } from "../../logic/intake";
import { Patient } from "../../models/patient";
import {
  createInitialTreatRecord,
  setPharmacyForPatient,
} from "../../logic/pharmacy";
import { QuestionResponse } from "../../models/intake";
import { getPreviousAppointments } from "../../logic/appointments";
import { BadRequestError } from "../../utils/errors";
import {
  addExternalProvider,
  setSharingPreferences,
} from "../../logic/external_provider";
import Address from "../../models/address";
import { sendPatientBookingConfirmation } from "../../logic/notifications";
import { Appointment } from "../../models/appointment";
import Logger from "../../config/logger";

export const getProfile = async (req: Request, res: Response) => {
  const user = req.context.user;
  const previousAppointments = await getPreviousAppointments(
    user.patient as Patient
  );
  const { phone, email } = user;
  const subscriptionStatus = req.context.user.patient?.subscriptionStatus;
  const hasCompletedFirstAppointment = previousAppointments.length > 0;
  // TODO(sbb): split this out into a different endpoint
  const address = await Address.query().where({ userId: user.id }).first();
  res.json({
    address,
    phone,
    email,
    hasCompletedFirstAppointment,
    subscriptionStatus,
  });
};

export const updateAddress = async (req: Request, res: Response) => {
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
  const { streetAddress, unitNumber, city, state, zip } = req.body;
  await setAddress(req.context.user, {
    streetAddress,
    unitNumber,
    city,
    state,
    zip,
  });

  res.json({ success: true });
};

export const updateEmail = async (req: Request, res: Response) => {
  await check("email", "Email is not valid").isEmail().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  await setEmail(req.context.user, req.body.email);
  res.json({ success: true });
};

export const updatePhone = async (req: Request, res: Response) => {
  await check("phone", "Phone is not valid").isMobilePhone("en-US").run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  await setPhone(req.context.user, req.body.phone);

  res.json({ success: true });
};

export const updateBirthdate = async (req: Request, res: Response) => {
  await check("birthdate", "Birthdate is not valid").isISO8601().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  if (req.context.user.birthdate) {
    throw new BadRequestError("Can not modify birthdate");
  }
  await setBirthdate(
    req.context.user,
    new Date(req.body.birthdate).toISOString()
  );
  res.json({ success: true });
};

export const consent = async (req: Request, res: Response) => {
  res.json({ success: true });
};

export const emergencyContact = async (req: Request, res: Response) => {
  await check("firstName", "firstName is required").isString().run(req);
  await check("lastName", "lastName is required").isString().run(req);
  await check("relationship", "relationship is required").isString().run(req);
  await check("phoneNumber", "phoneNumber is required").isString().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  const { firstName, lastName, relationship, phoneNumber } = req.body;
  await updateEmergencyContact(
    (req.context.user.patient as Patient).id,
    firstName,
    lastName,
    relationship,
    phoneNumber
  );
  res.json({ success: true });
};

export const updateIntakeResponse = async (req: Request, res: Response) => {
  await check("answers", "answers is invalid").isArray().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  const { answers } = req.body;
  await updateIntake(
    req.context.user?.patient as Patient,
    answers as Array<QuestionResponse>
  );
  res.json({ success: true });
};

export const updatePharmacyPreference = async (req: Request, res: Response) => {
  await check("pharmacyId", "Invalid pharmacy selection").isString().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  const patient = req.context.user?.patient as Patient;
  await setPharmacyForPatient(patient, req.body.pharmacyId);
  res.json({ success: true });
};

export const setPrimaryCarePhysician = async (req: Request, res: Response) => {
  const patient = req.context.user?.patient as Patient;
  if (req.body.allowSharing && !req.body.name) {
    throw new BadRequestError("Primary care physician name is required");
  }
  if (req.body.name) {
    await addExternalProvider(patient, "PCP", req.body.name, req.body.phone);
  }
  await setSharingPreferences(patient, "PCP", req.body.allowSharing);
  res.json({ success: true });
};

export const setExternalTherapist = async (req: Request, res: Response) => {
  const patient = req.context.user?.patient as Patient;
  if (req.body.allowSharing && !req.body.name) {
    throw new BadRequestError("Therapist name is required");
  }
  if (req.body.name) {
    await addExternalProvider(
      patient,
      "THERAPIST",
      req.body.name,
      req.body.phone
    );
  }
  await setSharingPreferences(patient, "THERAPIST", req.body.allowSharing);
  res.json({ success: true });
};

export const onboardingCompelete = async (req: Request, res: Response) => {
  const user = req.context.user;
  const patient = req.context.user?.patient as Patient;

  // Do post registration hooks here
  await createInitialTreatRecord(patient);

  const appointment = await Appointment.query()
    .where({ patientId: patient.id })
    .first()
    .withGraphFetched({ provider: { user: true } });
  if (appointment) {
    await sendPatientBookingConfirmation(
      user.email,
      user.phone,
      user.firstName,
      appointment.provider.user.fullName(),
      appointment.startTime,
      appointment.url || appointment.provider.doxyLink
    );
  } else {
    Logger.warn(
      `Could not find initial appointment for user ID ${user.id} in post-onboarding hook`
    );
  }

  res.json({ success: true });
};
