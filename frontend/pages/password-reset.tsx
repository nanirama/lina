/**
 * Patient facing password reset page
 */
import React, { useEffect, useState } from "react";
import AppHeader from "../components/core/AppHeader";
import { PasswordResetForm } from "@healthgent/common";
import { resetPassword } from "../lib/api";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Button from "../components/core/Button";

interface Props {
  token?: string;
}

const PasswordReset: NextPage<Props> = ({ token }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleSubmit = (password: string) => {
    setProcessing(true);
    setError("");
    return resetPassword(token as string, password)
      .then(() => router.push("/login"))
      .catch((e) => setError(e.toString()))
      .finally(() => setProcessing(false));
  };
  return (
    <div className="flex flex-col">
      <AppHeader />
      <div className="bg-blueGray-50 h-screen w-full">
        <div className="p-4">
          <div className="p-4 md:p-8 w-full md:w-1/3 md:h-72 mt-8 md:mt-16 mx-auto bg-white rounded-xl shadow-lg text-blueGray-800">
            <div className="text-lg text-center font-semibold ">
              Reset your password
            </div>
            <PasswordResetForm handleSubmit={handleSubmit}>
              <Button type="submit">Reset Password</Button>
              {error ? (
                <div className="text-center mt-2 text-red-600">{error}</div>
              ) : null}
            </PasswordResetForm>
          </div>
        </div>
      </div>
    </div>
  );
};

PasswordReset.getInitialProps = async ({ query }) => {
  const { token } = query;

  return { token: token as string };
};

export default PasswordReset;
