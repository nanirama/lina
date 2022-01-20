/**
 * Page shown after registration that links to results
 */
import { useRouter } from "next/router";
import React from "react";
import Button from "../../../components/core/Button";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";
import { useAppContext } from "../../../context/AppContext";

interface Props { }

const AccountCreated: React.FC<Props> = () => {
  const router = useRouter();
  const { onboarding } = useAppContext();
  return (
    <OnboardingContainer
      title="Lina - Account Created"
      percent={85}
      stage="registration"
    >
      <div className="w-full max-w-xl p-4">
        <h1 className="text-2xl mb-4 text-center">
          Let&apos;s review your results.
        </h1>
        <div className="text-lg leading-relaxed mb-4 text-center">
          We&apos;ll help you understand what they mean and what you can do.
        </div>
        <Button
          className="w-full"
          onClick={() =>
            router.push(`/onboarding/results?intakeId=${onboarding.intakeId}`)
          }
        >
          View Results
        </Button>
      </div>
    </OnboardingContainer>
  );
};

export default AccountCreated;
