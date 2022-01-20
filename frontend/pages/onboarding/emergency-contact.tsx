/**
 * Post payment page that asks for a user's emergency contact information
 */
import { useRouter } from "next/router";
import React from "react";
import EmergencyContactForm from "@healthgent/common/src/forms/EmergencyContactForm";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import { updateEmergencyContact } from "../../lib/api";
import Button from "../../components/core/Button";

interface Props { }

const EmergencyContact: React.FC<Props> = () => {
  const router = useRouter();
  const onComplete = () => {
    router.push("/onboarding/pharmacy");
  };
  // TODO(sbb): Fix typing here
  const handleSubmit = (e: any) => updateEmergencyContact(e).then(onComplete);
  return (
    <OnboardingContainer
      stage="emergency-contact"
      percent={75}
      title="Lina - Emergency Contact Information"
    >
      <div className="flex flex-col w-full px-8 lg:px-24">
        <div className="text-center text-xl font-semibold">
          Who can we contact in case of an emergency?
        </div>
        <div className="text-center font-light mb-2">
          Your emergency contact will only be contacted in the case of an urgent
          medical situation.
        </div>
        <EmergencyContactForm handleSubmit={handleSubmit}>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </EmergencyContactForm>
      </div>
    </OnboardingContainer>
  );
};

export default EmergencyContact;
