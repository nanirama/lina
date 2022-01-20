/**
 * Shows list of benefits of the service, used during the onboarding
 * flow specifically
 */
import React from "react";

interface Props { }

const Benefits: React.FC<Props> = () => {
  return (
    <div className="ml-4 mb-4 text-sm flex flex-col gap-y-4 ">
      <div className="flex items-center">
        <div className="w-16 h-10 mr-4 block relative flex-shrink-0">
          <img
            src="/images/providers/wang.jpg"
            height="32"
            width="32"
            className="rounded-full absolute top-0 z-10"
          />
          <img
            src="/images/providers/dr_patil.jpg"
            height="32"
            width="32"
            className="rounded-full absolute right-0 mr-2"
          />
        </div>
        <div>
          Mental health evaluation and prescription by board-certified providers
        </div>
      </div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-16 mr-4 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
        <div>FREE 2-day shipping</div>
      </div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-16 mr-4 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
          />
        </svg>
        <div>Continued support from your provider and our care team</div>
      </div>
    </div>
  );
};

export default Benefits;
