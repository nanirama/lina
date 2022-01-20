/**
 * Top of page component for onboarding flow
 */
import Link from "next/link";
import React from "react";
import Logo from "../landing/Logo";

interface Props { }

const OnboardingHeader: React.FC<Props> = () => {
  return (
    <nav className="w-full bg-white px-2 py-3 flex items-center justify-center">
      <Link href="/">
        <a href="#" className="flex items-center mx-auto">
          <Logo />
        </a>
      </Link>
    </nav>
  );
};

export default OnboardingHeader;
