/**
 * Simple absolutely positioned modal used to display data
 * to the user. can be closed by the user as well
 */
import React, { useState } from "react";
import { Transition } from "@headlessui/react";

interface Props {
  title: string;
  onClose: () => any;
  show: boolean;
}

const Modal: React.FC<Props> = ({ show, title, onClose, children }) => {
  return (
    <Transition
      show={show}
    // enter="ease-out duration-300"
    // enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-950"
    // enterTo="opacity-100 translate-y-0 sm:scale-1000"
    // leave="ease-in duration-200"
    // leaveFrom="opacity-100 translate-y-0 sm:scale-1000"
    // leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div
        className="fixed z-50 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-end">
                <div className="ml-auto mb-1 text-gray-400" onClick={onClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-xl leading-6 font-medium text-blue
                    gray-800"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <div>{children}</div>
                </div>
              </div>
            </div>
            {/* <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Deactivate
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div> */}
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Modal;
