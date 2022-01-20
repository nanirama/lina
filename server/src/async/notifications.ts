/**
 * Notifications that need to be sent at a specific time in the future, one time.
 */
import { addHours } from "date-fns";
import { Appointment } from "../models/appointment";
import { createJob } from "./queue";

export const sendFutureText = async (
  phoneNumber: string,
  message: string,
  date: Date
) => {
  return await createJob({
    jobType: "SMS_NOTIFICATION",
    executionTime: date,
    phoneNumber,
    message,
  });
};

export const queueAppointmentReminders = async (appointment: Appointment) => {
  return await createJob({
    jobType: "APPOINTMENT_REMINDER",
    executionTime: addHours(appointment.startTime, -24),
    appointmentId: appointment.id,
  });
};
