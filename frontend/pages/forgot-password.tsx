/**
 * Patient facing forgot my password page
 */
import React, { useState } from "react";
import AppHeader from "../components/core/AppHeader";
import Mail from "../components/svg/Mail";
import { forgotPassword } from "../lib/api";
import { useRouter } from "next/router";
import Button from "../components/core/Button";

interface Props { }

const ForgotPassword: React.FC<Props> = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const requestResetLink = () => {
    setProcessing(true);
    setError("");
    forgotPassword(email)
      .then(() => router.push("/reset-link-sent"))
      .catch((e) => setError(e.toString()))
      .finally(() => setProcessing(false));
  };
  const buttonDisabled = processing || !email;
  return (
    <div className="flex flex-col">
      <AppHeader />
      <div className="bg-blueGray-50 h-screen w-full">
        <div className="p-4">
          <div className="p-4 md:p-8 w-full md:w-1/3 md:h-72 mt-8 md:mt-16 mx-auto bg-white rounded-xl shadow-lg text-blueGray-800">
            <div className="text-lg text-center font-semibold ">
              Reset your account password
            </div>
            <div className="text-sm text-center">
              Please enter your email below to get a link to reset your
              password.
            </div>

            {error ? (
              <div className="text-center font-bold text-red-600">
                Invalid email address.
              </div>
            ) : null}

            <div className="relative flex flex-wrap items-stretch my-2">
              <span className="z-10 h-full leading-snug font-normal text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <Mail />
              </span>
              <input
                type="text"
                placeholder="Email"
                className="px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-400 relative  bg-white rounded text-sm shadow w-full pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button
              onClick={requestResetLink}
              disabled={buttonDisabled}
              className="w-full"
            >
              Send Reset Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
