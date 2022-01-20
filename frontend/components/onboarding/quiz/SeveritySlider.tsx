/**
 * Slider used to indicate severity of a particular symptom
 * during initial intake.
 */
import React, { useState } from "react";
import {
  Slider,
  SliderInput,
  SliderTrack,
  SliderRange,
  SliderHandle,
  SliderMarker,
} from "@reach/slider";
import "@reach/slider/styles.css";

interface Props {
  showDescription?: boolean;
}

const SeveritySlider: React.FC<Props> = ({ showDescription = true }) => {
  const [value, setValue] = useState(50);
  let severity = "";
  let description = "";
  if (value === 100) {
    severity = "Severe";
    description = "Negative impact on day to day life";
  } else if (value === 50) {
    severity = "Moderate";
    description = "Some impact on day to day life";
  } else {
    severity = "Mild";
    description = "Little impact on day to day life";
  }
  return (
    <div className="text-center">
      <div className="mb-1 leading-none">{severity}</div>

      <div className="text-xs mb-2">{description}</div>
      <SliderInput
        step={50}
        onChange={(e) => setValue(e)}
        value={value}
        defaultValue={50}
      >
        {/* <SliderTrack style={{ border: "1px solid #cbd5e1" }}> */}
        <SliderTrack style={{ background: "#f1f5f9" }}>
          {/* <SliderRange /> */}
          <SliderMarker
            value={0}
            className="p-2 rounded-full"
            style={{ background: "white", border: "1px solid #f1f5f9" }}
          />
          <SliderMarker
            value={50}
            className="p-2 rounded-full"
            style={{ background: "white", border: "1px solid #f1f5f9" }}
          />
          <SliderMarker
            value={100}
            className="p-2 rounded-full"
            style={{ background: "white", border: "1px solid #f1f5f9" }}
          />
          <SliderHandle
            value={value}
            style={{
              background: "#ff877a",
              border: "1px solid #eda4a4",
              outline: "none",
            }}
          />
        </SliderTrack>
      </SliderInput>
    </div>
  );
};

export default SeveritySlider;
