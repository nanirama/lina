/**
 * Card used to display a message encouraging the patient
 * to book a follow up appointment
 */
import React from "react";
import Button from "../core/Button";
import Card from "../core/Card";
import { format } from "date-fns";
import Link from "next/link";

interface Props {
  lastAppointmentDate: Date;
}

const FollowUpAppointmentCard: React.FC<Props> = ({ lastAppointmentDate }) => {
  const dateFmt = format(lastAppointmentDate, "LLLL do");
  return (
    <Card className="flex-col">
      <div className="text-2xl font-bold">Schedule a follow-up</div>
      <div className="text-sm text-blueGray-500 mt-4">
        Your last appointment was on {dateFmt}. Schedule a follow-up with your
        provider whenever you&apos;re ready. If you just need a refill, you can
        request one via the prescriptions tab or with a message to your
        provider.
      </div>
      <Link href="/patient_portal/followup">
        <Button asLink className="mt-4">
          Schedule follow-up
        </Button>
      </Link>
    </Card>
  );
};

export default FollowUpAppointmentCard;
