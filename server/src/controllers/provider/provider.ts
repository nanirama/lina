/**
 * A lot of provider related operations. Should probably be split out into more files.
 */
import { Request, Response } from "express";
import {
  createSlots,
  getSlotLength,
  removeAvailability,
  Slot,
} from "../../logic/provider";
import { getUpcomingProviderAppointments } from "../../logic/appointments";
import { getPatientsForProvider, getExistingSlots } from "../../logic/provider";
import { formatDate } from "../../utils/format";
import { Appointment } from "../../models/appointment";
import { Provider } from "../../models/provider";
import { Patient } from "../../models/patient";
import { BadRequestError, ForbiddenError } from "../../utils/errors";
import { sendAdminNotification, sendOpsNotification } from "../../logic/notifications";
import { sendOpsEmail } from "../../lib/sendgrid";
import { ProviderSlot } from "../../models/provider_slot";
import { addToOpsNotificationQueue } from "../../logic/ops_notification_queue";
import { NotificationTypes } from "../../models/ops_notification_queue";

export const me = async (req: Request, res: Response) => {
  const { email, phone, address } = req.context.user;
  const provider = req.context.user.provider as Provider;
  const canPrescribe = !!provider.treatRefreshToken;
  const slotLength = getSlotLength(provider.employeeType, "INITIAL");
  await res.json({ email, phone, address, canPrescribe, slotLength });
};

export const markAvailability = async (req: Request, res: Response) => {
  const provider = req.context.user?.provider;
  if (!provider) {
    throw new ForbiddenError("Invalid provider");
  }
  // @ts-ignore
  const slots = req.body.slots.map((s) => ({
    date: new Date(s.date),
    slotStart: new Date(s.slotStart),
  })) as Array<Slot>;
  if (slots.length === 0) {
    throw new BadRequestError(
      "Must provide at least one block of availability"
    );
  }
  await createSlots(provider, slots);

  try{
    // @ts-ignore
    const aggMessage = req.body.slots.map(s => {
      return ` Add Slot: ${new Date(s.slotStart).toTimeString()} | `
    }) as Array<Slot>;
    const message = `AVAILABILITY CHANGE: ${req.context.user?.fullName()} ${aggMessage.toString()}`
    
    //left commented as waiting feedback from running in production
    //await sendOpsNotification(message)
    //await sendOpsEmail({subject:"AVAILABILITY CHANGE",content:message})
    await addToOpsNotificationQueue(message,NotificationTypes.PROVIDER_AVAILABILITY)

  }catch(err)
  {
    console.error(err)
  }
  res.json({ success: true });
};

const appointmentToRespJson = (appt: Appointment, provider: Provider) => ({
  appointmentId: appt.id,
  patientId: appt.patientId,
  patientName: `${appt.patient.user.firstName} ${appt.patient.user.lastName}`,
  date: formatDate(appt.startTime),
  startTime: appt.startTime,
  endTime: appt.endTime,
  timestamp: new Date(appt.startTime).getTime(),
  videoLink: appt.url || provider.doxyLink,
  status: appt.status,
});

export const getSlots = async (req: Request, res: Response) => {
  const provider = req.context.user?.provider as Provider;
  const slots = await getExistingSlots(provider);
  const respJson = slots.map((s) => ({
    slotId: s.id,
    date: formatDate(s.slotDate),
    slotStart: s.slotStart,
    slotEnd: s.slotEnd,
    appointment: s.appointment
      ? appointmentToRespJson(s.appointment, provider)
      : null,
  }));
  res.json({ success: true, slots: respJson });
};

export const getAppointments = async (req: Request, res: Response) => {
  const provider = req.context.user?.provider;
  if (!provider) {
    throw new ForbiddenError("Invalid provider");
  }
  const appointments = await getUpcomingProviderAppointments(provider);
  const respJson = appointments.map((a) => appointmentToRespJson(a, provider));
  res.json({ success: true, appointments: respJson });
};

export const getPatients = async (req: Request, res: Response) => {
  // TODO(sbb): Clean up the typing here
  const provider = req.context.user?.provider as Provider;
  const patients = await getPatientsForProvider(provider);
  const respJson = patients.map((p: Patient) => ({
    name: `${p.user.firstName} ${p.user.lastName}`,
    firstName: p.user.firstName,
    lastName: p.user.lastName,
    patientId: p.id,
    email: p.user.email,
    phone: p.user.phone,
    primaryProvider: `${req.context.user?.firstName} ${req.context.user?.lastName}`,
    birthday: p.user.birthdate,
  }));
  res.json({ success: true, patients: respJson });
};

export const deleteAvailability = async (req: Request, res: Response) => {
  const { slotId } = req.params;
  const provider = req.context.user?.provider as Provider;

  try{
    const slot = await ProviderSlot.query().findById(slotId);
    const message = `AVAILABILITY CHANGE: ${req.context.user?.fullName()} Remove Availability: ${new Date(slot.slotStart).toTimeString()}`
    
    //left commented as waiting feedback from running in production
    //await sendOpsNotification(message)
    //await sendOpsEmail({subject:"AVAILABILITY CHANGE", content:message})
    await addToOpsNotificationQueue(message,NotificationTypes.PROVIDER_AVAILABILITY)

  }catch(err)
  {
    console.error(err)
  }
  await removeAvailability(provider, slotId);

  res.json({ success: true });
};
