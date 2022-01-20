/**
 * Card shown on the prescriptions tab explaining what will show up
 * after they are prescribed
 */
import React from "react";
import Card from "../core/Card";

interface Props { }

const PrescriptionIntroCard: React.FC<Props> = () => {
  return (
    <Card className="flex-col">
      <div className="text-center text-2xl">Renew your prescriptions</div>
      <div className="text-center font-semibold">
        No more refills? Request a prescription renewal between visits.
      </div>
      <div className="text-center text-sm text-gray-400">
        After your provider issues your first prescription, at their discretion.
      </div>
    </Card>
  );
};

export default PrescriptionIntroCard;
