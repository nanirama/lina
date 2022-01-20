/**
 * used to display severity sliders for each symptom the patient reported
 * early in the intake form
 */
import { QuestionResponse } from "@healthgent/server/src/lib/api_types";
import React from "react";
import SeveritySlider from "./SeveritySlider";

interface Props {
  response: QuestionResponse;
}

const WhatWeTreat: React.FC<Props> = ({ response }) => {
  if (!response) {
    return <div />;
  }
  const names = response.answer.map((a) => a.content);

  return (
    <div className="my-8 flex flex-col space-y-8 text-center text-lg">
      {names.map((name) => {
        return (
          <div key={name}>
            <div className="mb-2 font-semibold">{name}</div>
            <SeveritySlider />
          </div>
        );
      })}
    </div>
  );
};

export default WhatWeTreat;
