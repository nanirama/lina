/**
 * ID verification page with Person
 */
import React, { useState } from "react";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import { useRouter } from "next/router";
import { verifyId } from "../../lib/api";
import dynamic from "next/dynamic";
import { NextPage } from "next";
const Verification = dynamic(
  () => import("../../components/onboarding/Verification"),
  { ssr: false }
);

interface Props { }

const IdUpload: NextPage<Props> = () => {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const onComplete = () => {
    router.push("/onboarding/emergency-contact");
  };

  const submit = (inquiryId: string) => {
    setProcessing(true);
    verifyId(inquiryId)
      .then(onComplete)
      .finally(() => setProcessing(false));
  };

  return (
    <OnboardingContainer
      stage="verification"
      percent={75}
      title="Lina - Upload your ID"
    >
      <div className="flex flex-col px-8 lg:px-24">
        <Verification onComplete={submit} />
      </div>
    </OnboardingContainer>
  );
};

export default IdUpload;
