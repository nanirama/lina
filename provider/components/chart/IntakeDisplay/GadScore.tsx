/**
 * Display the GAD-7 score, with a progress bar showing severity
 */
import { ProgressBar } from "@healthgent/common";
import React from "react";
import Card from "../../Card";
import ExpandableCard from "../../core/ExpandableCard";
import AnswerDisplay from "./AnswerDisplay";
import { QuestionResponse } from "@healthgent/server/src/lib/api_types";

interface Props {
  gadScore: number;
  answers: Array<QuestionResponse>;
}

const GadScore: React.FC<Props> = ({ gadScore, answers }) => {
  let color = null;
  let severity = null;
  if (gadScore >= 15) {
    color = "red";
    severity = "severe";
  } else if (gadScore >= 10) {
    color = "yellow";
    severity = "moderate";
  } else if (gadScore >= 5) {
    color = "yellow";
    severity = "mild";
  } else {
    color = "green";
    severity = "minimal";
  }
  return (
    <Card className="flex flex-col">
      <div className="mb-2">
        <span className="font-semibold">GAD: {gadScore} / 21</span>
        <span className="text-blueGray-500"> ({severity})</span>
      </div>
      <ProgressBar
        percent={(gadScore / 21) * 100}
        color={color}
        rounded={true}
        bgGray={true}
      />

      <ExpandableCard title="GAD Details" className="mt-2">
        <AnswerDisplay answers={answers} />
      </ExpandableCard>
    </Card>
  );
};

export default GadScore;
