/**
 * Page used to initiate a password reset request
 */
import React, { useEffect, useState } from "react";
import { PasswordResetForm } from "@healthgent/common";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Button from "../components/core/Button";
import { resetPassword } from "../lib/api";

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
    <div className="flex w-full bg-black content-center items-center justify-center h-screen">
      <div className="bg-gray-300 p-8 lg:p-12 flex flex-col content-center items-center justify-center rounded-lg">
        <div className="text-lg text-center font-semibold ">
          Reset your password
        </div>
        <PasswordResetForm handleSubmit={handleSubmit}>
          <Button className="w-full" type="submit">
            Reset Password
          </Button>
          {error ? (
            <div className="text-center mt-2 text-red-600">{error}</div>
          ) : null}
        </PasswordResetForm>
      </div>
    </div>
  );
};

PasswordReset.getInitialProps = async ({ query }) => {
  const { token } = query;

  return { token: token as string };
};

export default PasswordReset;
