/**
 * Page shown after a reset link has been sent
 */
import React, { useState } from "react";

interface Props { }

const ResetLinkSent: React.FC<Props> = () => {
  return (
    <div className="flex w-full bg-black content-center items-center justify-center h-screen">
      <div className="bg-gray-300 p-8 lg:p-12 flex flex-col content-center items-center justify-center rounded-lg font-light">
        A password reset link has been sent to your email. Please check your
        spam folder if you have not received it within a few minutes.
      </div>
    </div>
  );
};

export default ResetLinkSent;
