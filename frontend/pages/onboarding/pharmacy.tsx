/**
 * Post payment page that asks for the patient's pharmacy preference
 */
import React, { useState } from "react";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import PharmacySelection from "../../components/patient_portal/PharmacySelection";
import useSWR from "swr";
import { setPharmacy, getPharmacies, getProfile } from "../../lib/api";
import { useRouter } from "next/router";

interface Props { }

const Pharmacy: React.FC<Props> = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    zip: "",
    lat: 0,
    lon: 0,
  });
  const { data: profile } = useSWR("patient_message_info", getProfile);
  const { data: pharmacies } = useSWR(
    ["get_pharmacies", profile?.address?.zip],
    (url, zip) => getPharmacies({ zip })
  );

  const onComplete = (pharmacyId: string) => {
    setPharmacy(`${pharmacyId}`).then(() =>
      router.push("/onboarding/pcp-info")
    );
  };

  return (
    <OnboardingContainer
      stage="pharmacy-selection"
      percent={75}
      title="Lina - Update your address"
    >
      <div className="text-center text-xl font-semibold">
        Please select your preferred pharmacy
      </div>
      <div className="my-2 text-center text-sm">
        If you&apos;re not sure yet, you can change this at any time in the
        patient portal.
      </div>
      <PharmacySelection
        pharmacies={pharmacies?.filter((p) => p.zip !== "12345") || []}
        onSelectPharmacy={onComplete}
      />
    </OnboardingContainer>
  );
};

export default Pharmacy;
