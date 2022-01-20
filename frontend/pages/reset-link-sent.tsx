/**
 * Page displayed after the user has requested a password reset link
 */
import React, { useState } from "react";
import AppHeader from "../components/core/AppHeader";
import Link from "next/link";
import Button from "../components/core/Button";

interface Props { }

const ResetLinkSent: React.FC<Props> = () => {
  return (
    <div className="flex flex-col">
      <AppHeader />
      <div className="bg-blueGray-50 h-screen w-full">
        <div className="p-4">
          <div className="p-4 md:p-8 w-full md:w-1/3 mt-8 md:mt-16 mx-auto bg-white rounded-xl shadow-lg text-blueGray-800">
            <div className="text-lg text-center font-semibold ">
              Reset link sent!
            </div>
            <div className="text-sm text-center mb-8">
              Please check your inbox for next steps.
            </div>

            <Link href="/login">
              <Button>Back to login</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetLinkSent;
