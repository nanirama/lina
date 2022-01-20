/**
 * Used to show the intro steps during onboarding
 * (hand waving, asking for name, smiley face winking etc)
 */
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import GetStartedSteps from "../../../components/onboarding/steps/GetStartedSteps";
import ReadyGetStarted from "../../../components/onboarding/steps/ReadyGetStarted";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";
import { useAppContext } from "../../../context/AppContext";
import { logEvent } from "../../../lib/event_logging";
import NameStep from "../../../components/onboarding/steps/NameStep";
import WelcomeStep from "../../../components/onboarding/steps/WelcomeStep";
import HeyThere from "../../../components/onboarding/steps/HeyThere";
import OnboardingTransition from "../../../components/onboarding/OnboardingTransition";
import StateStep from "../../../components/onboarding/steps/StateStep";
import { useUtm } from "../../../lib/hooks/utm";

interface Props {
  step: string;
  discountCode?: string;
}

const IntroSteps: NextPage<Props> = ({ step, discountCode }) => {
  useUtm();
  const router = useRouter();
  const { setDiscountCode, onboarding } = useAppContext();
  useEffect(() => {
    if (step === "start") {
      logEvent("start-assessment");
    }
  }, []);

  let component = null;
  if (step === "start") {
    component = <HeyThere next={() => router.push("/onboarding/intro/name")} />;
  } else if (step === "name") {
    component = (
      <NameStep next={() => router.push("/onboarding/intro/welcome")} />
    );
  } else if (step === "welcome") {
    component = (
      <WelcomeStep next={() => router.push("/onboarding/intro/state")} />
    );
  } else if (step === "state") {
    component = (
      <StateStep
        next={() => router.push("/onboarding/intro/steps")}
        onIneligible={() => {
          logEvent("ineligible");
          router.push("/onboarding/waitlist");
        }}
      />
    );
  } else if (step === "steps") {
    component = (
      <GetStartedSteps next={() => router.push("/onboarding/questionnaire")} />
    );
  } else {
    component = (
      <ReadyGetStarted next={() => router.push("/onboarding/questionnaire")} />
    );
  }
  return (
    <OnboardingContainer
      title={"Lina - Onboarding"}
      percent={25}
      stage="pre-screen"
    >
      <OnboardingTransition location={router.asPath}>
        <div className="w-full max-w-xl p-4">{component}</div>
      </OnboardingTransition>
    </OnboardingContainer>
  );
};

IntroSteps.getInitialProps = ({ query }) => {
  const step = query.step as string;
  const discountCode = query.discountCode as string | undefined;
  return { step, discountCode };
};

export default IntroSteps;
