/**
 * Login page for providers
 */
import React, { useEffect } from "react";
import { useAuth } from "@healthgent/common";
import { useRouter } from "next/router";
import LoginForm from "../components/forms/LoginForm";
import { login } from "../lib/api";
import { NextPage } from "next";

interface Props {
  token?: string;
}

const Login: NextPage<Props> = ({ token }) => {
  const authContext = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (token) {
      authContext.login(token);
      router.push("/clients");
    }
  }, []);

  const handleSubmit = (email: string, password: string) =>
    login(email, password).then((token) => {
      authContext.login(token);
      router.push("/clients");
    });
  return (
    <div className="flex w-full bg-black content-center items-center justify-center h-screen">
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
};

Login.getInitialProps = (context) => {
  const token = context.query.token as string;
  return { token };
};

export default Login;
