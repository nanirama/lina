/**
 * Cron jobs to remind providers of upcoming appointments/recent bookings
 */
import { addDays, startOfDay, differenceInHours } from "date-fns";
import Logger from "../../config/logger";
import { sendText } from "../../lib/twilio";
import { Appointment } from "../../models/appointment";
import { Provider } from "../../models/provider";
import { toTimeString } from "../../utils/time";
import { getUpcomingAppointments } from "../provider";

const getAppointmentDetails = async (appointment: Appointment) => {
  const appointmentWithPatient = await appointment
    .$query()
    .withGraphFetched({ patient: { user: true } });
  const { user } = appointmentWithPatient.patient;
  return `${toTimeString(appointment.startTime)} - ${user.fullName()}`;
};

export const getUpcomingProviderSchedule = async (provider: Provider) => {
  const today = new Date();
  const tomorrow = startOfDay(addDays(today, 1));
  const upcomingAppointments = await getUpcomingAppointments(provider);
  const appointmentsTomorrow = upcomingAppointments.filter(
    (a) => tomorrow.getTime() === startOfDay(new Date(a.startTime)).getTime()
  );
  if (appointmentsTomorrow.length === 0) {
    return;
  }
  const appointmentDetails = await Promise.all(
    appointmentsTomorrow.map(getAppointmentDetails)
  );
  return (
    "You have upcoming Lina appointments tomorrow. Schedule:\n" +
    appointmentDetails.join("\n")
  );
};

export const getNumberOfRecentBookings = async (provider: Provider) => {
  const today = new Date();
  const upcomingAppointments = await getUpcomingAppointments(provider);
  const bookedRecently = upcomingAppointments.filter(
    (a) => differenceInHours(today, a.createdAt) <= 24
  );
  return bookedRecently.length;
};

export const sendProviderSchedules = async () => {
  const providers = await Provider.query().withGraphFetched({ user: true });
  for await (const provider of providers) {
    const schedule = await getUpcomingProviderSchedule(provider);
    if (schedule) {
      Logger.info(
        `Sending tomorrow's appointment reminders to ${provider.user.fullName()}`
      );
      await sendText(provider.user.phone, schedule);
    } else {
      Logger.info(
        `Provider ${provider.user.fullName()} has no appointments tomorrow, skipping daily reminder.`
      );
    }
  }
};

export const sendNewBookingNotifications = async () => {
  const providers = await Provider.query().withGraphFetched({ user: true });
  for await (const provider of providers) {
    const numBookings = await getNumberOfRecentBookings(provider);
    if (numBookings > 0) {
      Logger.info(
        `Sending recent booking notification to ${provider.user.fullName()} - ${numBookings} new appointments`
      );
    } else {
      Logger.info(
        `Provider ${provider.user.fullName()} has no new bookings, skipping daily reminder.`
      );
    }
  }
};
