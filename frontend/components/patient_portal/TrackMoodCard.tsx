/**
 * card encouraging patients to track their mood via the quiz
 * we have in the patient portal
 */
import React from "react";
import Button from "../core/Button";
import Card from "../core/Card";
import Link from "next/link";

interface Props { }

const TrackMoodCard: React.FC<Props> = ({ }) => {
  return (
    <Card className="flex-col">
      <div className="text-2xl font-bold">Track your progress</div>
      <div className="text-sm text-blueGray-500 mt-4">
        Please fill out a short questionnaire to keep your care team updated and
        track progress in your care.
      </div>
      <Link href="/patient_portal/progress/checkin">
        <Button asLink className="mt-4">
          Track my progress
        </Button>
      </Link>
      <Link href="/patient_portal/progress/history">
        <Button className="mt-4" asLink buttonType="secondary" outline>
          See History
        </Button>
      </Link>
    </Card>
  );
};

export default TrackMoodCard;
