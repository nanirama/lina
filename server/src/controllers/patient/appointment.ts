/**
 * Endpoints for *patients* to manipulate appointments
 */
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import {
  bookAppointment,
  getAppointmentForProvider,
  getAvailableSlots,
  getNextAppointmentType,
  getPreviousAppointments,
  getUpcomingPatientAppointments,
} from "../../logic/appointments";
import { Patient } from "../../models/patient";
import { getProviderForPatient } from "../../logic/patient";

export const scheduleAppointment = async (req: Request, res: Response) => {
  await check("slotId", "Time slot required").isUUID().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  await bookAppointment(
    req.context.user,
    req.context.user?.patient as Patient,
    req.body.slotId
  );
  res.json({ success: true });
};

export const upcomingAppointment = async (req: Request, res: Response) => {
  const patient = req.context.user.patient as Patient;
  const appointments = await getUpcomingPatientAppointments(patient);
  if (appointments.length > 0) {
    const appointment = appointments[0];
    const { provider, providerId } = appointment;
    res.json({
      appointment: {
        provider: {
          firstName: provider.user.firstName,
          lastName: provider.user.lastName,
          providerId,
          bio: provider.bio,
          picUrl: provider.publicPicPath,
        },
        startTime: appointment.startTime,
        doxyLink: appointment.url,
      },
    });
  } else {
    res.json({});
  }
};

export const previousAppointments = async (req: Request, res: Response) => {
  const patient = req.context.user.patient as Patient;
  const previousAppointments = await getPreviousAppointments(patient);
  res.json({ previousAppointments });
};

export const getProviderAvailability = async (req: Request, res: Response) => {
  const patient = req.context.user.patient as Patient;
  const appointmentType = await getNextAppointmentType(patient);

  let providerId = undefined;
  if (appointmentType === "FOLLOW_UP") {
    const provider = await getProviderForPatient(patient);
    providerId = provider.id;
  }
  const { providers, slots } = await getAvailableSlots(
    patient.residenceState,
    appointmentType,
    providerId
  );
  // TODO(sbb): learn how to properly implement a view in express
  res.json({
    success: true,
    providers: providers.map((p) => ({
      providerId: p.id,
      firstName: p.user.firstName,
      lastName: p.user.lastName,
      bio: p.bio,
      picUrl: p.publicPicPath,
    })),
    slots: slots.map((s) => ({
      date: s.slotDate.toLocaleDateString(),
      startTime: s.slotStart,
      providerId: s.providerId,
      timeslotId: s.id,
    })),
  });
};

export const getAppointment = async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  const appointment = await getAppointmentForProvider(appointmentId);
  res.json({ success: true, appointment });
};
