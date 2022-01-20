/**
 * Not sure if this is used
 */
import React from "react";
import cx from "classnames";

interface Props {
  step: number;
}

const Steps: React.FC<Props> = ({ step }) => {
  return (
    <div className="grid grid-cols-3 h-2 w-full gap-x-2">
      <div
        className={cx("rounded-xl", step >= 1 ? "bg-blue-500" : "bg-gray-200")}
      ></div>
      <div
        className={cx("rounded-xl", step >= 2 ? "bg-blue-500" : "bg-gray-200")}
      ></div>
      <div
        className={cx("rounded-xl", step >= 3 ? "bg-blue-500" : "bg-gray-200")}
      ></div>
    </div>
  );
};

export default Steps;
