/**
 * Cron job used to confirm pending appointments for patients who have
 * completed the intake flow
 */

import { addDays } from "date-fns";
import Logger from "../../config/logger";
import { Appointment } from "../../models/appointment";
import { getPatientOnboardingStatus, onboardingComplete } from "../onboarding";

export const confirmPendingAppointments = async () => {
  const today = new Date();
  const latest = addDays(today, 7);
  const upcomingAppointments = await Appointment.query()
    .where({
      status: "PENDING",
    })
    .whereBetween("startTime", [today, latest])
    .withGraphFetched({ patient: { user: { patient: true } } });

  for await (const appointment of upcomingAppointments) {
    const onboardingStatus = await getPatientOnboardingStatus(
      appointment.patient.user
    );
    if (onboardingComplete(onboardingStatus)) {
      Logger.info(
        `Marking appointment ID ${appointment.id
        } for ${appointment.patient.user.fullName()} on ${appointment.startTime.toDateString()} complete`
      );
      await appointment.$query().patch({ status: "CONFIRMED" });
    }
  }
};
