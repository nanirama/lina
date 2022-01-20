/**
 * Post payment page confirming a successful payment
 * and informing the user that they need to answer
 * a few more questions.
 */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../components/core/Button";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import { getOnboardingStatus } from "../../lib/api";

interface Props { }

const BookingSuccess: React.FC<Props> = () => {
  const router = useRouter();
  const [hasInfo, setHasInfo] = useState(true);
  useEffect(() => {
    getOnboardingStatus().then((status) => {
      if (!status.hasDob) {
        setHasInfo(false);
      }
    });
  }, []);
  const url = hasInfo ? "/onboarding/intake-questions" : "/onboarding/dob";
  return (
    <OnboardingContainer
      stage="payment-success"
      percent={85}
      title="Lina - Payment Success"
    >
      <div className="w-full max-w-xl p-4">
        <div className="text-2xl font-semibold leading-none mb-4 text-center">
          Your membership is active.
        </div>
        <div className="text-lg leading-relaxed mb-4">
          Thanks for joining Lina! In order to provide you the best care
          possible, we will ask a few additional questions about your medical
          history.
          <br />
          <br />
          Please note that your appointment will be confirmed once you complete
          this process, along with identity verification.
        </div>
        <Button className="w-full" onClick={() => router.push(url)}>
          Continue
        </Button>
      </div>
    </OnboardingContainer>
  );
};

export default BookingSuccess;
