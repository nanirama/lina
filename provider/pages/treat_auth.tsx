/**
 * Page that Treat redirects to during their OAuth flow, which will
 * link a Treat ePrescribe account to our systems by passing in
 * the refresh token
 */
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import BaseProviderView from "../components/core/BaseView";
import { treatLogin } from "../lib/api";

interface Props {
  treatAuthCode?: string;
}

const TreatAuth: NextPage<Props> = ({ treatAuthCode }) => {
  const router = useRouter();
  useEffect(() => {
    if (!treatAuthCode) {
      return;
    }
    treatLogin(treatAuthCode).then(() => {
      router.push("/settings");
    });
  }, []);
  return (
    <BaseProviderView>
      Authorizing account...
      {`Treat auth code is: ${treatAuthCode}`}
    </BaseProviderView>
  );
};

TreatAuth.getInitialProps = ({ query }) => {
  const treatAuthCode = query.code as string;
  return { treatAuthCode };
};

export default TreatAuth;
