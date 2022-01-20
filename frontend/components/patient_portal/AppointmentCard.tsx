/**
 * Used to display information about upcoming appointment to patient
 */
import React from "react";
import Person from "../svg/Person";
import format from "date-fns/format";
import Link from "next/link";
import differenceInHours from "date-fns/differenceInHours";
import Card from "../core/Card";

interface Props {
  providerName: string;
  appointmentTime: Date;
  appointmentLink: string;
}

const AppointmentCard: React.FC<Props> = ({
  providerName,
  appointmentTime,
  appointmentLink,
}) => {
  const appointmentFullDate = format(appointmentTime, "EEEE, MMMM do");
  const appointmentTimeStr = new Date(appointmentTime).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    }
  );
  const isSoon = differenceInHours(appointmentTime, new Date()) <= 1;
  return (
    <Card className="flex-col">
      <div className="text-2xl font-bold">Upcoming Appointment</div>
      <div className="flex flex-col text-lg mt-4">
        <div className="">
          {appointmentFullDate} - {appointmentTimeStr}
        </div>
        <Link href="/patient_portal/reschedule">
          <a className="text-sm underline">Reschedule</a>
        </Link>
      </div>

      <div className="flex my-2 text-gray-500 font-semibold">
        <div className="mr-2">
          <Person />
        </div>
        {providerName}
      </div>
      <div className="text-sm text-blueGray-500">
        Your visit will take place over a secure video call. The link will be
        available both in your confirmation email and on this page 1 hour before
        the appointment. Your first visit usually lasts approximately 50
        minutes.
      </div>
      {isSoon && (
        <a href={appointmentLink} className="underline">
          Secure Video Chat Link
        </a>
      )}
    </Card>
  );
};

export default AppointmentCard;
