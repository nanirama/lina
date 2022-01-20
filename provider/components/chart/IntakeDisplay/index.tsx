/**
 * Display the GAD score, PHQ score, and freeform answers
 * on the patient chart
 */

import { IntakeResponse } from "@healthgent/server/src/lib/api_types";
import React from "react";
import Card from "../../Card";
import ExpandableCard from "../../core/ExpandableCard";
import AnswerDisplay from "./AnswerDisplay";
import GadScore from "./GadScore";
import PhqScore from "./PhqScore";

interface Props {
  intakeResponse?: IntakeResponse;
  phqScore: number;
  gadScore: number;
}

const IntakeDisplay: React.FC<Props> = ({
  intakeResponse,
  phqScore,
  gadScore,
}) => {
  if (!intakeResponse) {
    return <></>;
  }
  const filterAnswers = (intake: IntakeResponse, filter: string) => {
    return intake.answers.filter((a) => a.question.key.match(filter));
  };
  const otherAnswers = intakeResponse.answers.filter(
    (a) =>
      !(
        a.question.key.match("gad") ||
        a.question.key.match("phq") ||
        a.question.key.match("unused")
      )
  );
  return (
    <Card className="flex flex-col space-y-2">
      <span className="text-xl">Initial Intake Response</span>
      <PhqScore
        phqScore={phqScore}
        answers={filterAnswers(intakeResponse, "phq")}
      />
      <GadScore
        gadScore={gadScore}
        answers={filterAnswers(intakeResponse, "gad")}
      />

      <ExpandableCard title="Response details (other)" startOpen={false}>
        <AnswerDisplay answers={otherAnswers} />
      </ExpandableCard>
    </Card>
  );
};

export default IntakeDisplay;
