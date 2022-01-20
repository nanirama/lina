/**
 * Appointment confirmation page
 */
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { setTimeout } from "timers";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import { markOnboardingComplete } from "../../lib/api";

interface Props { }

const Confirmation: React.FC<Props> = () => {
  const router = useRouter();
  useEffect(() => {
    markOnboardingComplete();
    setTimeout(() => {
      router.push("/patient_portal/home");
    }, 2500);
  }, []);
  return (
    <OnboardingContainer
      percent={100}
      stage="complete"
      title="Lina - Appointment Confirmed"
    >
      <div className="text-center font-bold text-3xl">All set!</div>
      <div className="mx-4 text-center">
        Your appointment is confirmed. You will be automatically redirected to
        the patient portal.
      </div>
    </OnboardingContainer>
  );
};

export default Confirmation;
