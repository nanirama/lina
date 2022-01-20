/**
 * All notification logic for patients and providers.
 * See async/notifications for async notifications
 * that use Redis.
 */
import { sendText } from "../lib/twilio";
import { sendSimpleEmail, sendTemplate } from "../lib/sendgrid";
import { differenceInHours, format } from "date-fns";
import { ICalendar, GoogleCalendar } from "datebook";
import { Appointment } from "../models/appointment";
import { sendFutureText } from "../async/notifications";
import startOfDay from "date-fns/startOfDay";
import addHours from "date-fns/addHours";
import addMinutes from "date-fns/addMinutes";
import { utcToZonedTime } from "date-fns-tz";
import { User } from "../models/user";
import Logger from "../config/logger";
import { UserReferrer } from "../models/user_referrer";
import { toTimeString } from "../utils/time";

const ADMIN_NUMBER = "+16233232955";
const TECH_ADMIN_NUMBER = process.env.TECH_PHONE_NUMBER || "+16233232955";

export const sendAdminNotification = (msg: string) => {
  sendText(ADMIN_NUMBER, msg);
  sendText(TECH_ADMIN_NUMBER, msg);
};

export const sendOpsNotification = (msg: string) => {
  sendText(ADMIN_NUMBER, msg);
  sendText("+12182454072", msg); //ThatAPICompany for testing
};

export const sendTechAdminNotification = async (msg: string) => {
  await sendText(TECH_ADMIN_NUMBER, msg);
};

const createProviderCalendarEvent = (
  appointmentId: string,
  start: Date,
  end: Date
) => {
  const appointmentLink = `https://healthgent-provider.vercel.app/appointments/${appointmentId}`;
  const params = {
    title: `Lina Appointment`,
    description: `Link: ${appointmentLink}`,
    location: "Lina",
    start,
    end,
  };
  const cal = new ICalendar(params);
  const gcal = new GoogleCalendar(params);
  return {
    ical: cal.render(),
    google: gcal.render(),
  };
};

export const sendPatientBookingCancellation = (
  email: string,
  phoneNumber: string,
  patientName: string,
  //providerName: string,
  date: Date,
  //apptLink: string,
  timezone?: string
) => {
  Logger.info("sendPatientBookingCancellation", email, phoneNumber);

  const dateStr = format(date, "EEEE, MMMM do");
  const timeStr = toTimeString(date, timezone);
  const msg = `Hi ${patientName}, this is Lina. Your upcoming appointment on ${dateStr} at ${timeStr} has been cancelled.`;

  // TODO(sbb): Do this later if they don't provide a phone immediately
  if (phoneNumber) {
    try{
      sendText(phoneNumber, msg);
      
    }catch(err){
      console.log(err)
    };
    
  }

  // ToDo: awaiting SendGrid email template: https://linear.app/lina/issue/RET-57/as-clinical-ops-i-would-like-patients-to-be-automatically-notified
  sendSimpleEmail(email, "Lina Appointment Cancellation", msg);
  /*
  sendTemplate(
    email,
    "Lina Appointment Cancellation",
    "test",
    {
      first_name: patientName,
      appt_datetime: `${dateStr} at ${timeStr}`,
      provider: providerName,
      appt_link: apptLink,
    }
  );*/
};

export const sendPatientBookingConfirmation = (
  email: string,
  phoneNumber: string,
  patientName: string,
  providerName: string,
  date: Date,
  apptLink: string,
  timezone?: string
) => {
  Logger.info("sendPatientBookingConfirmation", email, phoneNumber);

  const dateStr = format(date, "EEEE, MMMM do");
  const timeStr = toTimeString(date, timezone);
  const msg = `Hi ${patientName}, this is Lina. Thank you for booking with us! Your upcoming appointment is on ${dateStr} at ${timeStr}. Please check your email to confirm your account and reference appointment details.`;

  // TODO(sbb): Do this later if they don't provide a phone immediately
  if (phoneNumber) {
    sendText(phoneNumber, msg);
  }
  sendTemplate(
    email,
    "Lina Appointment Confirmation",
    "appointmentConfirmation",
    {
      first_name: patientName,
      appt_datetime: `${dateStr} at ${timeStr}`,
      provider: providerName,
      appt_link: apptLink,
    }
  );
};

export const sendAppointmentReminders = async (appointmentId: string) => {
  const appointment = await Appointment.query()
    .findById(appointmentId)
    .withGraphFetched({ provider: { user: true }, patient: { user: true } });
  if (!appointment) {
    Logger.error(
      `Invalid appointment ID for reminder notification: ${appointmentId}`
    );
    return;
  }

  if (appointment.status !== "CONFIRMED") {
    Logger.info(
      `Skipping notifcation for appointment ID ${appointment.id} because status is ${appointment.status}`
    );
    sendTechAdminNotification(
      `Skipping notifcation for appointment ID ${appointment.id} because status is ${appointment.status}`
    );
  }
  const { patient, provider } = appointment;
  const patientName = patient.user.firstName;
  const appointmentLink = appointment.url || provider.doxyLink;
  const timeStr = toTimeString(appointment.startTime, patient.user.timezone);
  const patientMsg = `Hi ${patientName}, your appointment is tomorrow at ${timeStr}. Your Lina provider will meet you at this secure video link: ${appointmentLink}`;
  await sendText(patient.user.phone, patientMsg);
  Logger.info(
    `Sent notification for appointment ID ${appointment.id
    } to ${patient.user.fullName()}`
  );
};

export const sendAdminBookingNotification = async (
  appointment: Appointment
) => {
  const appointmentWithGraph = await Appointment.query()
    .findById(appointment.id)
    .withGraphFetched({
      providerSlot: true,
      provider: { user: true },
      patient: { user: true },
    });
  const referrer = await UserReferrer.query()
    .where({ userId: appointmentWithGraph.patient.userId })
    .first();

  const isInitialAppointment =
    differenceInHours(new Date(), appointmentWithGraph.patient.user.createdAt) <
    24;
  const appointmentType = isInitialAppointment ? "initial" : "followup";

  const { patient, provider } = appointmentWithGraph;
  const dateStr = format(appointment.startTime, "EEEE, MMMM do");
  const timeStr = toTimeString(appointment.startTime);
  const msg = `new booking: ${patient.user.fullName()} booked ${appointmentType} with ${provider.user.fullName()} on ${dateStr} at ${timeStr}`;
  await sendAdminNotification(msg);
};

export const sendProviderBookingNotification = async (
  appointment: Appointment
) => {
  const appointmentWithGraph = await Appointment.query()
    .findById(appointment.id)
    .withGraphFetched({
      providerSlot: true,
      provider: { user: true },
      patient: { user: true },
    });
  const isInitialAppointment =
    differenceInHours(new Date(), appointmentWithGraph.patient.user.createdAt) <
    24;
  const { user } = appointmentWithGraph.provider;
  const providerName = `${appointmentWithGraph.provider.title} ${user.lastName}`;
  const patientName = `${appointmentWithGraph.patient.user.firstName} ${appointmentWithGraph.patient.user.lastName}`;
  await _sendProviderBookingNotification(
    appointment.id,
    user.email,
    user.phone,
    providerName,
    patientName,
    appointment.startTime,
    appointment.endTime,
    isInitialAppointment,
    false
  );
};

export const _sendProviderBookingNotification = (
  appointmentId: string,
  email: string,
  phoneNumber: string,
  providerName: string,
  patientName: string,
  start: Date,
  end: Date,
  initialAppointment: boolean,
  isReschedule: boolean,
  timezone?: string
) => {
  const dateStr = format(start, "EEEE, MMMM do");
  // TODO(sbb): Change this when we're out of FL
  const timeStr = toTimeString(start, timezone);

  const invite = createProviderCalendarEvent(appointmentId, start, end);
  const appointmentType = initialAppointment ? "initial" : "follow-up";
  let msg = `Hi ${providerName}, you have a new ${appointmentType} appointment with ${patientName} booked on ${dateStr} at ${timeStr}. Please check the provider portal for details. \nGoogle calendar event: ${invite.google}`;
  if (isReschedule) {
    msg = `Hi ${providerName}, ${patientName} has rescheduled their upcoming appointment for ${dateStr} at ${timeStr}`;
  }
  sendText(phoneNumber, msg);
  sendSimpleEmail(email, "New Lina Appointment", msg, invite.ical);
};

export const sendPatientPortalMessageNotification = async (
  toUser: User,
  fromUser: User
) => {
  const msg =
    toUser.accountType === "PATIENT"
      ? `You have a new secure message from your Lina provider. Please login to the patient portal to view the message and reply.`
      : `You have a new secure message from a patient. Please login to the provider portal to view this message.`;
  await sendSimpleEmail(toUser.email, "New Lina Secure Message", msg);
  if (toUser.accountType === "PROVIDER") {
    // TODO(sbb): send this the next morning
    await sendText(
      toUser.phone,
      `You have a new secure message from ${fromUser.firstName} ${fromUser.lastName}. Please login to the provider portal to view this message`
    );
  }
};

export const sendFeedbackText = async (
  name: string,
  phoneNumber: string,
  link: string
) => {
  const msg = `Hi ${name}, we want to make Lina better for you by listening to your feedback about our platform. How was your experience so far? Here's a 3 question survey: ${link}`;
  await sendText(phoneNumber, msg);
};

export const requestFollowUp = async (name: string, phoneNumber: string) => {
  const link = "https://www.hellolina.com/login";
  const msg = `${name}, your Lina provider is requesting an appointment. Please log into the patient portal to schedule an appointment: ${link}`;
  await sendText(phoneNumber, msg);
};

export const sendMissedAppointmentReminder = async (phoneNumber: string) => {
  const msg = `Lina here, your care team sent you a reminder to reschedule a missed appointment. Please reschedule your appointment in the patient portal.`;
  await sendText(phoneNumber, msg);
};

export const sendBillingReminder = async (
  name: string,
  phoneNumber: string
) => {
  const link = "https://www.hellolina.com/login";
  const msg = `Lina: Hey ${name}, you have a new action item from the care team to keep your subscription active. Should only take a few minutes: ${link}`;
  await sendText(phoneNumber, msg);
};
