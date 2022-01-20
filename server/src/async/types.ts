/**
 * Typescript types for async job queue
 */
type JobType =
  | "SMS_NOTIFICATION"
  | "EMAIL_NOTIFICATION"
  | "APPOINTMENT_REMINDER";

interface IAsyncJob {
  jobType: JobType;
  executionTime: Date;
}

export interface AsyncSMSJob extends IAsyncJob {
  jobType: "SMS_NOTIFICATION";
  phoneNumber: string;
  message: string;
}

export interface AsyncEmailJob extends IAsyncJob {
  jobType: "EMAIL_NOTIFICATION";
}

export interface AsyncAppointmentReminderJob extends IAsyncJob {
  jobType: "APPOINTMENT_REMINDER";
  appointmentId: string;
}

export type AsyncJob =
  | AsyncSMSJob
  | AsyncEmailJob
  | AsyncAppointmentReminderJob;
