/**
 * Used to ensure a particular page/view is only viewed by authenticated users
 */
import { useAuth } from "@healthgent/common";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedView: React.FC<{}> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (typeof window === "undefined" || isLoading) {
      return;
    }
    if (!isAuthenticated) {
      router.push("/login");
    }
    if (!isLoading && !isAuthenticated) {
      logout();
      router.push("/login");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading || !isAuthenticated) {
    return <div />;
  }

  return <>{children}</>;
};

export default ProtectedView;
