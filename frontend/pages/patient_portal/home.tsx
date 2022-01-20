/**
 * Patient portal homepage, which includes upcoming appointment info,
 * navigation to different parts of the portal, and reminders to book.
 */
import React from "react";
import AppointmentCard from "../../components/patient_portal/AppointmentCard";
import BasePatientPortalView from "../../components/patient_portal/BasePatientPortalView";
import {
  getPreviousAppointments,
  getProfile,
  getUpcomingAppointment,
} from "../../lib/api";
import useSwr from "swr";
import TrackMoodCard from "../../components/patient_portal/TrackMoodCard";
import NoAppointmentCard from "../../components/patient_portal/NoAppointmentCard";
import FollowUpAppointmentCard from "../../components/patient_portal/FollowUpAppointmentCard";
import differenceInDays from "date-fns/differenceInDays";
import SubscriptionStatusCard from "../../components/patient_portal/SubscriptionStatusCard";

interface Props {}

const Home: React.FC<Props> = () => {
  const { data: profile } = useSwr("/profile/", getProfile);
  const { data, error } = useSwr("/appointment", getUpcomingAppointment);
  const { data: previousAppointments } = useSwr(
    "/prev_appts",
    getPreviousAppointments
  );
  if (!data) {
    return <BasePatientPortalView>Loading...</BasePatientPortalView>;
  }

  const { appointment } = data;
  const lastAppointmentDate =
    previousAppointments !== undefined && previousAppointments?.length > 0
      ? new Date(previousAppointments[0]?.startTime)
      : undefined;

  const showFollowUpCard = lastAppointmentDate
    ? differenceInDays(new Date(), lastAppointmentDate) >= 1
    : undefined;

  return (
    <BasePatientPortalView>
      <div className="max-w-xl mx-auto grid gap-4">
        <SubscriptionStatusCard
          subscriptionStatus={profile?.subscriptionStatus}
        />
        <TrackMoodCard />
        {showFollowUpCard && !appointment?.startTime && (
          <FollowUpAppointmentCard lastAppointmentDate={lastAppointmentDate!} />
        )}
        {appointment?.startTime && (
          <>
            <SubscriptionStatusCard
              subscriptionStatus={profile?.subscriptionStatus}
            />
            <AppointmentCard
              providerName={`${appointment.provider?.firstName} ${appointment.provider?.lastName}`}
              appointmentTime={new Date(appointment.startTime)}
              appointmentLink={appointment.doxyLink}
            />
          </>
        )}
        {!showFollowUpCard && !appointment?.startTime && <NoAppointmentCard />}
      </div>
    </BasePatientPortalView>
  );
};

export default Home;
