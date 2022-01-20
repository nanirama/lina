/**
 * Home page of the EHR, shows a list of upcoming appointments
 * split by day
 */
import React from "react";
import useSWR from "swr";
import BaseProviderView from "../components/core/BaseView";
import { getAppointments, getUnreadMessageCount } from "../lib/api";
import AppointmentList from "../components/scheduling/AppointmentList";
import { isSameWeek, startOfDay } from "date-fns";

interface Props {}

const Appointments: React.FC<Props> = () => {
  const { data } = useSWR("/provider/appointments", getAppointments);
  const { data: numUnreadMessages } = useSWR(
    "unread_messages",
    getUnreadMessageCount
  );
  const appointments = data ?? [];
  const sortedAppointments = appointments.sort(
    (a, b) => a.timestamp - b.timestamp
  );
  const today = startOfDay(new Date());
  const recentAppointments = sortedAppointments.filter(
    (a) => startOfDay(new Date(a.startTime)).getTime() < today.getTime()
  );

  const appointmentsToday = sortedAppointments.filter(
    (a) => startOfDay(new Date(a.startTime)).getTime() === today.getTime()
  );

  const appointmentsThisWeek = sortedAppointments.filter(
    (a) =>
      isSameWeek(today, new Date(a.startTime)) &&
      startOfDay(new Date(a.startTime)).getTime() > today.getTime()
  );

  const futureAppointments = sortedAppointments.filter(
    (a) => !isSameWeek(today, new Date(a.startTime))
  );

  const hasUnreadMessages =
    numUnreadMessages !== undefined && numUnreadMessages > 0;
  return (
    <BaseProviderView>
      {hasUnreadMessages ? (
        <div className="p-4 text-red-400 border border-1 border-red-400">
          You have unread messages. Please check the messages tab.
        </div>
      ) : null}

      <div className="flex mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Recent appointments
      </div>
      <AppointmentList
        appointments={recentAppointments}
        noneMsg="No recent appointments."
      />

      <div className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Today&apos;s Appointments
      </div>
      <AppointmentList
        appointments={appointmentsToday}
        noneMsg="No appointments today."
      />
      <div className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Upcoming appointments this week
      </div>
      <AppointmentList
        appointments={appointmentsThisWeek}
        noneMsg="No appointments the rest of this week."
      />

      <div className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Future Appointments
      </div>
      <AppointmentList
        appointments={futureAppointments}
        noneMsg="No appointments booked for after this week."
      />
    </BaseProviderView>
  );
};

export default Appointments;
