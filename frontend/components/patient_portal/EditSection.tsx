/**
 * Small bar showing a section is editable on the settings page
 */
import React from "react";

interface Props {
  title: string;
}

const EditSection: React.FC<Props> = ({ title }) => {
  return (
    <div className="p-4">
      <div className="flex w-full">
        <div>{title}</div>
        <a href="#" className="uppercase ml-auto text-sm font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          edit
        </a>
      </div>
      <hr />
    </div>
  );
};

export default EditSection;
