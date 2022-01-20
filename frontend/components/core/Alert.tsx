/**
 * Basic Alert used to show an error during form submission or
 * other user action
 */
import React from "react";

interface Props {
  error: string;
  onClick: () => void;
}

const Alert: React.FC<Props> = ({ error, onClick }) => {
  return (
    <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
      <span className="text-xl inline-block mr-5 align-middle">
        <i className="fas fa-bell" />
      </span>
      <span className="inline-block align-middle mr-8">
        <b className="capitalize">Error</b> {error}
      </span>
      <button
        onClick={onClick}
        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
      >
        <span>×</span>
      </button>
    </div>
  );
};

export default Alert;
