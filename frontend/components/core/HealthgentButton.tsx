/**
 * UNUSED COMPONENT
 * feel free to delete
 */
import cx from "classnames";
import React from "react";

interface Props {
  enabled?: boolean;
  primary?: boolean;
  onClick?: () => void;
  [x: string]: any;
}

const LinaButton: React.FC<Props> = ({
  primary = true,
  enabled = true,
  onClick,
  children,
  ...props
}) => {
  const buttonClass = cx(
    "bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
  );
  return (
    <button
      className={buttonClass}
      type="button"
      style={{ transition: "all .15s ease" }}
      onClick={onClick}
      disabled={!enabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default LinaButton;
