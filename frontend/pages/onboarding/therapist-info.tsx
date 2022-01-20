/**
 * post payment page asking for the patient's existing therapist info
 */
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { ExternalProviderForm } from "../../../common/src";
import Button from "../../components/core/Button";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import { addExternalTherapistInfo } from "../../lib/api";

interface Props { }

const TherapistInfoPage: NextPage<Props> = () => {
  const router = useRouter();
  const nextStep = () => {
    router.push("/onboarding/confirmation");
  };
  const handleSubmit = ({
    name,
    phone,
    email,
    share,
  }: {
    name: string;
    phone: string;
    email: string;
    share: boolean;
  }) => {
    return addExternalTherapistInfo(name, phone, email, share).then(nextStep);
  };
  const handleNone = () => {
    return addExternalTherapistInfo("", "", "", false).then(nextStep);
  };
  return (
    <OnboardingContainer
      stage="therapist-info"
      percent={80}
      title="Lina - Therapist Information"
    >
      <div className="flex flex-col w-full px-8 lg:px-24">
        <div className="text-center text-xl font-semibold">
          Do you currently see a therapist?
        </div>
        <div className="text-center font-light mb-2 text-sm">
          We believe in a collaborative care model at Lina. If you currently see
          an outside therapist, we can share updates about your treatment with
          your consent. Note that this is optional.
        </div>
        <ExternalProviderForm
          providerType="THERAPIST"
          handleSubmit={handleSubmit}
        >
          <Button type="submit" className="w-full mt-4">
            Continue
          </Button>
        </ExternalProviderForm>
        <div className="flex text-sm justify-between items-center mt-3">
          <hr className="w-full" />
          <span className="p-2 text-gray-400 mb-1">OR</span>
          <hr className="w-full" />
        </div>
        <Button buttonType="secondary" outline onClick={handleNone}>
          I don&apos;t have a therapist
        </Button>
      </div>
    </OnboardingContainer>
  );
};

export default TherapistInfoPage;
