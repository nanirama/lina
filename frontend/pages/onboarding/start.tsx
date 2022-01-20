/**
 * Page shown before the quiz when a patient is in a state covered by Lina
 */
import { DiscountCode } from "@healthgent/server/src/lib/api_types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Button from "../../components/core/Button";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import { useAppContext } from "../../context/AppContext";

interface Props {
  discountCode?: string;
}

const Start: NextPage<Props> = ({ discountCode }) => {
  const router = useRouter();
  const { setDiscountCode, onboarding } = useAppContext();
  if (discountCode) {
    setDiscountCode(discountCode as DiscountCode);
  }
  useEffect(() => {
    onboarding.setNotification("Sweet! We're available in your state");
  }, []);
  return (
    <OnboardingContainer
      stage="pre-screen"
      percent={5}
      title="Lina - Get Started"
    >
      <div className="w-full max-w-xl p-4">
        <div className="text-2xl font-semibold leading-none mb-4 text-center">
          Let&apos;s get started!
        </div>
        <div className="text-lg leading-relaxed mb-4 text-center">
          You&apos;re on the right track. We&apos;re going to ask you a series
          of clinically tested questions to help us understand your needs and
          emotional state. Please answer as accurately as possible, since your
          answers will determine the type of care we suggest.
        </div>
        <Button onClick={() => router.push("/onboarding/state")}>
          Continue
        </Button>
      </div>
    </OnboardingContainer>
  );
};

Start.getInitialProps = ({ query }) => {
  const discountCode = query.discountCode as string | undefined;
  return { discountCode };
};

export default Start;
