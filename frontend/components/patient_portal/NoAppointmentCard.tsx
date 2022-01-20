/**
 * Card that displays a message saying the patient has no appointments
 */
import React from "react";
import Card from "../core/Card";

interface Props { }

const NoAppointmentCard: React.FC<Props> = () => {
  return (
    <Card className="flex-col">
      <div className="text-2xl font-bold">No Upcoming Appointments</div>
      <div className="text-sm text-blueGray-500 mt-4">
        You have no upcoming appointments. When you&apos;re ready to schedule a
        new appointment, please contact us at (201) 817-4909 or send us a
        message.
      </div>
    </Card>
  );
};

export default NoAppointmentCard;
