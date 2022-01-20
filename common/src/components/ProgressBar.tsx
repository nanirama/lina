/**
 * Component used to display a progress bar
 */
import React from "react";
import cx from "classnames";

interface Props {
  percent: number;
  color?: string;
  rounded?: boolean;
  bgGray?: boolean;
  marker?: number;
  // CSS class for the markers
  markerStyle?: string;
}
const ProgressBar: React.FC<Props> = ({
  percent,
  color,
  rounded,
  bgGray,
  marker,
  markerStyle,
}) => {
  const width = percent + "%";
  const lineColor = cx({
    "bg-red-500": color === "red",
    "bg-yellow-300": color === "yellow",
    "bg-blue-500": color === "blue",
    "bg-green-500": color === "green",
    "bg-yellow-500": color === "orange",
    "bg-coral": color === "coral" || !color,
  });
  const bgColor = cx(
    !bgGray
      ? {
        "bg-red-200": color === "red",
        "bg-yellow-200": color === "yellow",
        "bg-blue-200": color === "blue",
        "bg-coral-200": color === "coral" || !color,
        "bg-green-200": color === "green",
      }
      : "bg-gray-200"
  );

  return (
    <div className="relative w-full">
      <div
        className={cx("overflow-hidden h-2 text-xs flex", bgColor, {
          rounded,
        })}
      >
        {marker || 0 > 0 ? (
          <div
            className={cx("absolute h-full", markerStyle)}
            style={{ width: "1px", marginLeft: `${marker}%` }}
          ></div>
        ) : null}
        <div
          style={{ width }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${lineColor}`}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
