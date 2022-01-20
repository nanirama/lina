/**
 * See next.js documentation:
 * https://nextjs.org/docs/advanced-features/custom-app
 */
import React from "react";
import "../styles/tailwind.css";

import PageViewTracker from "../components/metrics/PageViewTracker";
import { AppContextProvider } from "../context/AppContext";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "@healthgent/common";
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <RecoilRoot>
        <PageViewTracker>
          <AuthProvider>
            <AppContextProvider>
              <Component {...pageProps} />
            </AppContextProvider>
          </AuthProvider>
        </PageViewTracker>
      </RecoilRoot>
    </>
  );
};

export default MyApp;
