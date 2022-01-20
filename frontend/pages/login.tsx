/**
 * Patient facing login page
 */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AppHeader from "../components/core/AppHeader";
import Lock from "../components/svg/Lock";
import Mail from "../components/svg/Mail";
import { useAuth, useKeyPress } from "@healthgent/common";
import Link from "next/link";
import { NextPage } from "next";
import Button from "../components/core/Button";
import { login as loginApi } from "../lib/api";

interface Props {
  token?: string;
  firstName?: string;
  redirect?: string;
}

const Login: NextPage<Props> = ({ token, firstName }) => {
  const router = useRouter();
  const { login, isLoading, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const isEnter = useKeyPress("Enter");

  useEffect(() => {
    if (token) {
      login(token);
      router.push("/patient_portal/home");
    }
  }, []);

  useEffect(() => {
    if (isEnter) {
      tryLogin();
    }
  }, [isEnter]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/patient_portal/home");
    }
  }, [isLoading, isAuthenticated]);

  const tryLogin = () => {
    setProcessing(true);
    setError("");
    loginApi(email, password)
      .then(login)
      .then(() => {
        router.push("/patient_portal/home");
      })
      .catch((e: Error) => setError(e.toString()))
      .finally(() => setProcessing(false));
  };

  const disabled = !(email && password);
  const buttonDisabled = processing || disabled;
  const title = firstName ? `Welcome back ${firstName}!` : "Welcome back!";
  return (
    <div className="flex flex-col">
      <AppHeader />
      <div className="bg-blueGray-50 h-screen w-full">
        <div className="p-4">
          <div className="p-4 md:p-6 w-full md:w-1/3 mt-8 md:mt-16 mx-auto border bg-white rounded-xl">
            <div className="text-lg text-center font-semibold ">{title}</div>
            <div className="text-sm text-center">
              Please sign in to access the patient portal.
            </div>
            {error ? (
              <div className="text-center text-red-600">
                Invalid email address or password. Please try again.
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
            <div className="relative flex flex-wrap items-stretch my-2">
              <span className="z-10 h-full leading-snug font-normal text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <Lock />
              </span>
              <input
                type="password"
                placeholder="Password"
                className="px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-400 relative bg-white rounded text-sm shadow w-full pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              className="w-full"
              onClick={tryLogin}
              disabled={buttonDisabled}
            >
              Login
            </Button>
            <div className="flex w-full items-center justify-center text-sm mt-2">
              <div>
                Don&apos;t have an account?{" "}
                <Link href="/onboarding/intro/start">
                  <a href="#" className="mx-auto underline">
                    Register
                  </a>
                </Link>
              </div>
            </div>
            <div className="flex items-center text-sm mt-2">
              <Link href="/forgot-password">
                <a href="#" className="mx-auto underline">
                  Forgot password?
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.getInitialProps = (context) => {
  const token = context.query.token as string;
  const firstName = context.query.firstName as string | undefined;
  const redirect = context.query.redirect as string | undefined;
  return { token, firstName, redirect };
};

export default Login;
