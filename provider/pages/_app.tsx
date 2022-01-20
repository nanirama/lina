/**
 * Custom _app (https://nextjs.org/docs/advanced-features/custom-app) used to provide
 * application context
 */
import React from "react";
import "../styles/globals.css";
import { AuthProvider } from "@healthgent/common";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
