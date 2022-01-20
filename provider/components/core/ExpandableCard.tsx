/**
 * Expandable card used to display data that can be hidden.
 * Used throughout the patient chart, e.g. on quiz responses.
 */
import React, { useState } from "react";
import Card from "../Card";
import cx from "classnames";

interface Props {
  title: string;
  editLink?: string;
  startOpen?: boolean;
  className?: string;
}

const ExpandableCard: React.FC<Props> = ({
  title,
  className,
  children,
  startOpen,
}) => {
  const [open, setOpen] = useState(startOpen !== undefined ? startOpen : true);
  const toggle = () => setOpen(!open);
  return (
    <Card className={cx("flex flex-col", className)}>
      <div className="flex text-gray-500 uppercase font-bold text-xs">
        {title}
        <div
          className="self-end ml-auto w-6 h-6 text-gray-300 hover:text-blue-400"
          onClick={toggle}
        >
          {!open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      {open ? <div className="flex flex-col ">{children}</div> : null}
    </Card>
  );
};

export default ExpandableCard;
