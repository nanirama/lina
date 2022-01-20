/**
 * Call to action button for landing page
 */
import Link from "next/link";
import React, { useState } from "react";
import cx from "classnames";

interface Props {
  className?: string;
}

const CTAButton: React.FC<Props> = ({ className, children }) => {
  return (
    <Link href="/onboarding/intro/start">
      <a
        href="#"
        className={cx(
          "flex items-center text-center rounded-full bg-teal hover:bg-teal-400 uppercase text-white text-sm font-bold p-2",
          className
        )}
      >
        <span className="text-center ml-auto">{children}</span>
        <div className="ml-auto rounded-full flex items-center justify-center bg-seashell p-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.78009 0.982666L8.60321 2.15955L15.9447 9.52906L0.445312 9.445V11.1263L15.9727 11.2103L8.77133 18.3837L9.94822 19.5886L19.1671 10.3697L9.78009 0.982666Z"
              fill="#374146"
            />
          </svg>
        </div>
      </a>
    </Link>
  );
};

export default CTAButton;
