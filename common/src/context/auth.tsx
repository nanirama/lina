/**
 * Stores authentication context in JS cookies, with the
 * context containing a JSON Web Token
 */
import { createContext, useState, useContext, useEffect, useRef } from "react";
import Cookies from "js-cookie";

interface IAuthContext {
  isAuthenticated: boolean;
  isLoggedInAs: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  loginAs: (token: string) => void;
  logout: () => void;
}

// @ts-ignore
export const AuthContext = createContext<IAuthContext>({});

export const AuthProvider: React.FC<{ tokenKey?: string }> = ({
  tokenKey,
  children,
}) => {
  const cookieKey = tokenKey ?? "auth_token";
  const [token, setToken] = useState<string>();
  const [loading, setLoading] = useState(true);
  const isLoggedInAsRef = useRef<boolean>();

  useEffect(() => {
    isLoggedInAsRef.current = !!localStorage.getItem("logged_in_as");
    setToken(Cookies.get(cookieKey));
    setLoading(false);
  }, []);

  const login = (t: string) => {
    setLoading(true);
    Cookies.set(cookieKey, t, { expires: 0.5 });
    setToken(t);
    setLoading(false);
  };

  const loginAs = (t: string) => {
    localStorage.setItem("logged_in_as", "1");
    isLoggedInAsRef.current = true;
    login(t);
  };

  const logout = () => {
    Cookies.remove(cookieKey);
    localStorage.removeItem("logged_in_as");
    isLoggedInAsRef.current = false;
    setToken("");
  };

  const state = {
    isAuthenticated: !!token,
    isLoggedInAs: !!isLoggedInAsRef.current,
    isLoading: loading,
    login,
    loginAs,
    logout,
  };
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context as IAuthContext;
};
