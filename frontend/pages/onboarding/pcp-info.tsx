/**
 * post payment page that asks for primary care provider's info
 */
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { ExternalProviderForm } from "../../../common/src";
import Button from "../../components/core/Button";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import { addPrimaryCarePhysicianInfo } from "../../lib/api";

interface Props { }

const PcpInfoPage: NextPage<Props> = () => {
  const router = useRouter();
  const nextStep = () => {
    router.push("/onboarding/therapist-info");
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
    return addPrimaryCarePhysicianInfo(name, phone, email, share).then(
      nextStep
    );
  };
  const handleNone = () => {
    return addPrimaryCarePhysicianInfo("", "", "", false).then(nextStep);
  };
  return (
    <OnboardingContainer
      stage="pcp-info"
      percent={80}
      title="Lina - Primary Care Physician Information"
    >
      <div className="flex flex-col w-full px-8 lg:px-24">
        <div className="text-center text-xl font-semibold">
          Do you currently have a primary care physician?
        </div>
        <div className="text-center font-light mb-2 text-sm">
          We believe in a collaborative care model at Lina. If you currently
          have a primary care physician, please provide their contact
          information. Note that this is optional, and we will only update them
          with treatment progress with your consent.
        </div>
        <ExternalProviderForm providerType="PCP" handleSubmit={handleSubmit}>
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
          I don&apos;t have a primary care physician
        </Button>
      </div>
    </OnboardingContainer>
  );
};

export default PcpInfoPage;
