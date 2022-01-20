/**
 * Top bar that displays first month offer
 */
import Link from "next/link";
import React from "react";

interface Props {
  onExit: () => unknown;
}

const OfferBar: React.FC<Props> = ({ onExit }) => {
  return (
    <div className="t-0 bg-red-400 text-white h-8 w-full flex items-center justify-center text-center">
      <Link href="/onboarding/intro/start?discountCode=50OFF">
        <a href="#" className="underline mx-auto">
          Start your first month for just $45
        </a>
      </Link>
      <div onClick={onExit} className="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default OfferBar;
