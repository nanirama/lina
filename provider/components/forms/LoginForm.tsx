/**
 * Login form with keyboard shortcut (enter to submit)
 */
import { useKeyPress } from "@healthgent/common";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ErrorDialog } from "./ErrorDialog";

interface Props {
  handleSubmit: (email: string, password: string) => Promise<any>;
}

const LoginForm: React.FC<Props> = ({ handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isEnter = useKeyPress("Enter");

  useEffect(() => {
    if (isEnter) {
      onClick();
    }
  }, [isEnter]);

  const onClick = () => {
    if (!email || !password) {
      setError("Email and password required");
      return;
    }
    setError("");
    handleSubmit(email, password).catch((e) => setError(e.toString()));
  };
  return (
    <div className="bg-gray-300 p-8 lg:p-12 flex flex-col content-center items-center justify-center rounded-lg">
      <div className="text-2xl mb-4 text-gray-700 ">Provider Login</div>
      <div className="block uppercase text-gray-700 text-xs font-bold mb-2">
        Email
      </div>
      <input
        type="text"
        placeholder="Email"
        className="w-full mb-2 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-400 relative bg-white rounded text-sm shadow"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="block uppercase text-gray-700 text-xs font-bold mb-2">
        Password
      </div>
      {error ? <ErrorDialog error={error} close={() => setError("")} /> : null}
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-2 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-400 relative bg-white rounded text-sm shadow"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="primary-button-blue w-72" onClick={onClick}>
        Login
      </button>
      <div className="mt-4">
        <Link href="/forgot-password">
          <a className="underline hover:no-underline text-sm">
            Forgot password?
          </a>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
