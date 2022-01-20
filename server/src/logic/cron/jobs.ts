import { differenceInWeeks, format, subDays, subHours } from "date-fns";
import Logger from "../../config/logger";
import { sendInternalEmail, sendOpsEmail } from "../../lib/sendgrid";
import { Appointment } from "../../models/appointment";
import { Patient } from "../../models/patient";
import {
  requestFollowUp,
  sendMissedAppointmentReminder,
} from "../notifications";
import { sendOpsNotification } from "../notifications";
import { OpsNotification } from "../../models/ops_notification_queue";

const REMINDER_PERIOD_WEEKS = 6;

/**
 * Send reminders to patients to book a follow up appointment
 * if they haven't in `REMINDER_PERIOD_WEEKS`
 */
export const sendFollowUpReminders = async () => {
  const activePatients = await Patient.query()
    .where({
      subscriptionStatus: "ACTIVE",
    })
    .withGraphFetched({ user: true });
  const today = new Date();
  activePatients.forEach(async (patient) => {
    const lastAppointment = await Appointment.query()
      .where({ patientId: patient.id })
      .orderBy("startTime", "desc")
      .first();
    const weeksSinceLastAppointment = differenceInWeeks(
      today,
      lastAppointment.startTime
    );
    if (weeksSinceLastAppointment >= REMINDER_PERIOD_WEEKS) {
      Logger.info(
        `Requesting appointment from ${patient.user.id}, last appointment was ${weeksSinceLastAppointment} weeks ago`
      );
      await requestFollowUp(patient.user.firstName, patient.user.phone);
    }
  });
};

/**
 * Sends notifications to patients who missed their appointments
 */
export const sendMissedAppointmentNotifications = async () => {
  const today = new Date();
  const weekAgo = subDays(today, 7);
  const appointments = await Appointment.query()
    .where({ status: "NO_SHOW" })
    .whereBetween("startTime", [weekAgo, today])
    .withGraphFetched({ patient: { user: true } });
  appointments.forEach(async (appointment) => {
    await sendMissedAppointmentReminder(appointment.patient.user.phone);
  });
};

/**
 *
 * Sends list of users who dropped off after registration to Lina admin team
 */
export const sendDailyDropoffEmail = async () => {
  const now = new Date();
  const earliest = subHours(now, 24);
  const latest = subHours(now, 2);
  const patients = await Patient.query()
    .withGraphFetched({ user: { referrer: true } })
    .whereBetween("createdAt", [earliest, latest])
    .whereNotExists(
      Appointment.query().whereColumn("patients.id", "appointments.patientId")
    )
    .orderBy("patients.createdAt");
  const patientText = patients
    .map(
      (p) =>
        `Name: ${p.user.fullName()} - ${p.user.email} / ${p.user.phone
        } - UTM Term: ${p.user.referrer?.utmTerm || "unknown"}`
    )
    .join("\n");
  const date = format(earliest, "MMM do");
  const subject = `User Dropoff Report for ${date}`;
  const content = `Users who dropped off in the funnel in the last 24 hours:\n\n${patientText}`;
  if (process.env.NODE_ENV !== "production") {
    console.log(content);
    return;
  }
  await sendInternalEmail({ subject, content });
};


export const sendOpsNotificationDigest = async() =>
{
  const queuedMsgs = await OpsNotification
  .query()
  .where({ "sent": false})

  const digest = queuedMsgs.map(msg => msg.message)

  await sendOpsEmail({content: digest.join("\n"), subject:"Digest"})


  await OpsNotification.query()
  .update({ sent: true })
  .where({ sent: false })
  console.log('queuedMsgs cleared')

}