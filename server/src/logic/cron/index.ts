/**
 * Setup for all cron jobs, handled by node-schedule
 * https://www.npmjs.com/package/node-schedule
 */
import * as jobs from "./jobs";
import schedule from "node-schedule";
import Logger from "../../config/logger";
import {
  markPatientSubscriptionStatus,
  sendBillingReminders,
} from "../billing";
import { executePendingJobs } from "../../async/queue";
import {
  sendProviderSchedules,
  sendNewBookingNotifications,
} from "./provider_reminder";
import { confirmPendingAppointments } from "./appointment_confirmation";
import { validateNewRegistrationAddresses } from "./patient_onboarding";

export const scheduleCronJobs = () => {
  Logger.info("Scheduling async job runner.");
  schedule.scheduleJob("*/5 * * * *", () => {
    Logger.info("Running scheduled tasks.");
    executePendingJobs();
  });

  // TODO(sbb): reduce the frequency
  Logger.info("Scheduling patient subscription sync job.");
  schedule.scheduleJob("*/30 * * * *", () => {
    Logger.info("Pulling patient subscription info from Stripe");
    markPatientSubscriptionStatus();
  });

  Logger.info("Scheduling billing reminder job.");
  schedule.scheduleJob("0 12 * * 1,3,5", () => {
    Logger.info("Sending billing reminders");
    sendBillingReminders();
  });

  Logger.info("Scheduling followup reminder job.");
  schedule.scheduleJob("0 12 * * 5", () => {
    Logger.info("Sending followup reminders");
    jobs.sendFollowUpReminders();
    jobs.sendMissedAppointmentNotifications();
  });

  Logger.info("Scheduling internal dropoff email job.");
  schedule.scheduleJob("0 9 * * *", () => {
    Logger.info("Sending internal email for users who dropped off");
    jobs.sendDailyDropoffEmail();
  });

  Logger.info(
    "Scheduling provider schedule reminder + new booking notification job."
  );
  schedule.scheduleJob("0 13 * * *", () => {
    Logger.info("Sending provider new booking notifications.");
    sendNewBookingNotifications();
    Logger.info("Sending provider schedule reminders.");
    sendProviderSchedules();
  });

  Logger.info("Scheduling appointment confirmation job.");
  schedule.scheduleJob("0 */1 * * *", () => {
    Logger.info("Confirming eligible pending appointments.");
    confirmPendingAppointments();
  });

  Logger.info("Scheduling patient residence state confirmation job.");
  schedule.scheduleJob("0 13 * * *", () => {
    Logger.info("Validating registration addresses");
    validateNewRegistrationAddresses();
  });


  Logger.info("Scheduling patient residence state confirmation job.");
  schedule.scheduleJob("0 9 * * *", () => {
    Logger.info("Send Ops Digest Email registration addresses");
    jobs.sendOpsNotificationDigest();
  });

  
  
};
