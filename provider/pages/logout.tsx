/**
 * Logout, the provider will never actually see a page for this
 * since it redirects immediately
 */
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "@healthgent/common";

interface Props { }

const Logout: React.FC<Props> = () => {
  const router = useRouter();
  const authContext = useAuth();
  useEffect(() => {
    authContext.logout();
    router.push("/login");
  }, []);
  return <div>Logging out...</div>;
};

export default Logout;
