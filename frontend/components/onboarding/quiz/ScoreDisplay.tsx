/**
 * Shows a progress bar that changes color depending
 * on the severity of the result for initial intake.
 */
import { ProgressBar } from "@healthgent/common";
import React from "react";

interface Props {
  title: string;
  level: string;
  percent: number;
}

const ScoreDisplay: React.FC<Props> = ({ title, level, percent }) => {
  let color = "yellow";
  if (level === "moderate") {
    color = "orange";
  } else if (level === "severe") {
    color = "red";
  }
  return (
    <div className="w-full">
      <div className="text-center mb-1">
        <span>{title}:</span> <span className="underline">{level}</span>
      </div>
      <ProgressBar
        percent={percent}
        color={color}
        bgGray={true}
        rounded={true}
      />
      <div className="flex w-full justify-between text-xs">
        <div>Minimal</div>
        <div>Severe</div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
