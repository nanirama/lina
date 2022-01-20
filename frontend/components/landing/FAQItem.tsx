/**
 * Individual question/answer in the FAQ
 */
import React, { useState } from "react";
import { Transition } from "@headlessui/react";

interface Props { }

const FAQItem: React.FC<{ title: string }> = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-b border-darkGray pb-2 flex flex-col justify-between items-center">
      <button
        className="w-full flex items-center text-left focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <span className="text-lg font-light">{title}</span>
        <div className="ml-auto">
          {open ? (
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 12H4"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          )}
        </div>
      </button>
      <Transition
        show={open}
        className="py-4"
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {children}
      </Transition>
    </li>
  );
};

export default FAQItem;
