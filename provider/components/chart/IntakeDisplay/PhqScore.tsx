/**
 * Display the PHQ-9 score, with a progress bar showing severity
 */
import { ProgressBar } from "@healthgent/common";
import React from "react";
import Card from "../../Card";
import ExpandableCard from "../../core/ExpandableCard";
import { QuestionResponse } from "@healthgent/server/src/lib/api_types";
import AnswerDisplay from "./AnswerDisplay";

interface Props {
  phqScore: number;
  answers: Array<QuestionResponse>;
}

const PhqScore: React.FC<Props> = ({ phqScore, answers }) => {
  let color = null;
  let severity = null;
  if (phqScore >= 20) {
    color = "red";
    severity = "severe";
  } else if (phqScore >= 15) {
    color = "red";
    severity = "moderately severe";
  } else if (phqScore >= 10) {
    color = "yellow";
    severity = "moderate";
  } else if (phqScore >= 5) {
    color = "yellow";
    severity = "mild";
  } else {
    color = "green";
    severity = "minimal";
  }
  return (
    <Card className="flex flex-col">
      <div className="mb-2">
        <span className="font-semibold">PHQ: {phqScore} / 27 </span>
        <span className="text-blueGray-500">({severity})</span>
      </div>
      <ProgressBar
        percent={(phqScore / 27) * 100}
        color={color}
        rounded={true}
        bgGray={true}
      />
      <ExpandableCard title="PHQ Details" className="mt-2">
        <AnswerDisplay answers={answers} />
      </ExpandableCard>
    </Card>
  );
};

export default PhqScore;
