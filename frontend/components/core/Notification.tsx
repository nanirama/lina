/**
 * Notification that pops up on the screen with a transition. Used
 * during the onboarding flow to indicate an action has been
 * successfully completed.
 */
import React, { useState, Fragment } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";

interface Props {
  show: boolean;
  showClose: boolean;
  title?: string;
  text?: string;
  onClose: () => unknown;
}

const Notification: React.FC<Props> = ({
  show,
  onClose,
  text,
  title,
  showClose,
}) => {
  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-500 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="z-50 absolute max-w-xs w-full bg-green-400 text-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              {title ? <p className="text-sm font-medium ">{title}</p> : null}
              {text ? <p className="mt-1 text-sm ">{text}</p> : null}
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="bg-white rounded-md inline-flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  onClose();
                }}
              >
                <span className="sr-only">Close</span>
                {showClose ? (
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                ) : null}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Notification;
