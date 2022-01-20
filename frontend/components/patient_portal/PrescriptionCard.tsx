/**
 * Card component to show prescription information
 */
import React from "react";
import Card from "../core/Card";

interface Props {
  status: string;
  drugName: string;
  quantity: number;
  units: string;
  duration: number;
  totalRefills: number;
}

const PrescriptionCard: React.FC<Props> = ({ drugName, units, duration }) => {
  return (
    <Card className="flex-col">
      <div className="text-lg font-semibold">{drugName}</div>
      <div className="text-blueGray-500 text-xs">
        {duration} day supply of {units.toLowerCase()}
      </div>
    </Card>
  );
};

export default PrescriptionCard;
