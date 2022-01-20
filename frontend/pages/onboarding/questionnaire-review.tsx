/**
 * Page displayed when the user is ineligble for signing up for Lina
 */
import React from "react";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";

interface Props { }

const Review: React.FC<Props> = () => {
  return (
    <OnboardingContainer
      stage="questionnaire"
      percent={85}
      title="Lina - Questionnaire Review"
    >
      <div className="flex flex-col mx-auto items-center max-w-4xl px-4">
        <div className="text-center font-semibold text-2xl">
          Thank you for completing the questionnaire!
        </div>
        <div className="text-center text-md mb-2 text-gray-500 space-y-2">
          <p>
            Based on your responses, we do not think our practice is a fit for
            your needs. Please reach out to{" "}
            <a href="mailto:support@hellolina.com" className="underline">
              support@hellolina.com
            </a>{" "}
            if you need help finding a referral to a provider that is suitable
            for your needs. If you need immediate help for emotional distress,
            please do not wait. Please use the resources below:
          </p>
          <div>
            National Suicide Prevention Hotline:{" "}
            <a href="tel: 1-800-273-8255" className="font-semibold underline">
              1-800-273-8255
            </a>
          </div>
          <div>
            Crisis Text Line: Text Home to{" "}
            <a href="tel: 741-741" className="font-semibold underline">
              741-741
            </a>
          </div>
        </div>
      </div>
    </OnboardingContainer>
  );
};

export default Review;
