/**
 * Post payment page asking for the users home address
 */
import { useRouter } from "next/router";
import React, { useState } from "react";
import AddressForm from "@healthgent/common/src/forms/AddressForm";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import { getStates, updateAddress } from "../../lib/api";
import { Address as AddressType } from "@healthgent/server/src/lib/api_types";
import Button from "../../components/core/Button";
import Alert from "../../components/core/Alert";
import { NextPage, NextPageContext } from "next";
import { eligibleStates, USState } from "@healthgent/server/src/utils/states";
import { useEffect } from "react";

interface Props { }

// Because of a custom _app.js we can't use getServerSideProps
// https://nextjs.org/docs/advanced-features/custom-app

const Address: NextPage<Props> = () => {
  const [error, setError] = useState("");
  const [eligibleStates, setEligibleStates] = useState<Array<USState>>([]);
  const router = useRouter();

  useEffect(() => {
    getStates().then(setEligibleStates);
  }, []);

  const onComplete = () => {
    router.push("/onboarding/verification");
  };
  const handleSubmit = (address: AddressType) => {
    return updateAddress(address, true)
      .then(onComplete)
      .catch((e) => setError(e.toString()));
  };

  return (
    <OnboardingContainer
      stage="address"
      percent={75}
      title="Lina - Update your address"
    >
      <div className="flex flex-col w-full px-8 lg:px-24">
        <div className="text-center text-xl font-semibold">
          Please provide your mailing address
        </div>
        <div className="text-center font-light mb-2">
          This information is required for your patient record.
        </div>
        <AddressForm
          handleSubmit={handleSubmit}
          eligibleStates={eligibleStates}
        >
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </AddressForm>
        {error ? (
          <div className="mt-4">
            <Alert error={error} onClick={() => setError("")} />
          </div>
        ) : null}
      </div>
    </OnboardingContainer>
  );
};

export default Address;
