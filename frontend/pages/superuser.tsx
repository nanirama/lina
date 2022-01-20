import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { useAuth, useKeyPress } from "@healthgent/common";

import { loginAs as userLoginAs, superuser } from "../lib/api";
import AppHeader from "../components/core/AppHeader";
import Button from "../components/core/Button";
import Lock from "../components/svg/Lock";
import Mail from "../components/svg/Mail";

const INPUT_CLASS_NAME =
  "px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-400 relative bg-white rounded text-sm shadow w-full pl-10";

const Superuser: NextPage = () => {
  const router = useRouter();
  const { login, loginAs, logout } = useAuth();
  const [password, setPassword] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const isEnter = useKeyPress("Enter");

  const [superuserToken, setSuperuserToken] = useState("");
  const [loggedAsToken, setLoggedAsToken] = useState("");

  const tryLogin = useCallback(() => {
    setProcessing(true);
    setError("");
    superuser(password)
      .then(setSuperuserToken)
      .catch((e: Error) => setError(e.toString()))
      .finally(() => setProcessing(false));
  }, [password]);

  const tryLoginAs = useCallback(() => {
    setProcessing(true);
    setError("");
    userLoginAs(patientEmail)
      .then(setLoggedAsToken)
      .catch((e: Error) => setError(e.toString()))
      .finally(() => setProcessing(false));
  }, [patientEmail]);

  useEffect(() => logout(), [logout]);

  useEffect(() => {
    if (!isEnter) return;
    if (superuserToken) {
      tryLoginAs();
    } else {
      tryLogin();
    }
  }, [isEnter, superuserToken, tryLoginAs, tryLogin]);

  useEffect(() => {
    if (!superuserToken) return;
    login(superuserToken);
  }, [login, superuserToken]);

  useEffect(() => {
    if (!loggedAsToken) return;
    loginAs(loggedAsToken);
    router.push("/patient_portal/home");
  }, [router, loginAs, loggedAsToken]);

  const disabled = !password;
  const buttonDisabled = processing || disabled;

  return (
    <div className="flex flex-col">
      <AppHeader />
      <div className="bg-blueGray-50 h-screen w-full">
        <div className="p-4">
          <div className="p-4 md:p-6 w-full md:w-1/3 mt-8 md:mt-16 mx-auto border bg-white rounded-xl">
            <div className="text-lg text-center font-semibold ">
              {superuserToken ? "Login as" : "Superuser Login"}
            </div>
            {error ? (
              <div className="text-center text-red-600">
                {superuserToken
                  ? "Email not found"
                  : "Invalid password. Please try again."}
              </div>
            ) : null}
            <div className="relative flex flex-wrap items-stretch my-2">
              <span className="z-10 h-full leading-snug font-normal text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                {superuserToken ? <Mail /> : <Lock />}
              </span>
              {superuserToken ? (
                <input
                  autoFocus
                  type="email"
                  placeholder="Patient email"
                  className={INPUT_CLASS_NAME}
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                />
              ) : (
                <input
                  autoFocus
                  type="password"
                  placeholder="Password"
                  className={INPUT_CLASS_NAME}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
            </div>
            <Button
              className="w-full"
              onClick={superuserToken ? tryLoginAs : tryLogin}
              disabled={buttonDisabled}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Superuser;
