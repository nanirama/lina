/**
 * Absolutely positioned modal that can be closed.
 */

import React from "react";

interface Props {
  onClose?: () => any;
}

const Modal: React.FC<Props> = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 overflow-auto flex bg-black bg-opacity-40 justify-center">
    <div className="relative pl-8 pr-4 py-4 rounded-xl bg-white w-full max-w-md m-auto flex-col flex">
      <div className="flex w-full">
        <div className="ml-auto mb-1 text-gray-400" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      {children}
    </div>
  </div>
);

export default Modal;
