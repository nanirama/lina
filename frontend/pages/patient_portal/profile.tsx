/**
 * Profile/Settings page for patients
 */
import React from "react";
import AddressSection from "../../components/patient_portal/AddressSection";
import BasePatientPortalView from "../../components/patient_portal/BasePatientPortalView";
import EmailSection from "../../components/patient_portal/EmailSection";
import PhoneSection from "../../components/patient_portal/PhoneSection";
import { getProfile, updatePaymentMethod } from "../../lib/api";
import useSwr from "swr";
import { useAuth } from "@healthgent/common";
import Card from "../../components/core/Card";
import Button from "../../components/core/Button";
import PaymentMethodSection from "../../components/patient_portal/PaymentMethodSection";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PharmacySection from "../../components/patient_portal/PharmacySection";

interface Props { }

const Profile: React.FC<Props> = () => {
  const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

  const { logout } = useAuth();
  const { data, error, mutate } = useSwr("/profile/", getProfile);
  const onChange = () => mutate();
  const profileData = data;
  if (!profileData) {
    return <BasePatientPortalView>Loading...</BasePatientPortalView>;
  }

  return (
    <BasePatientPortalView>
      <Elements stripe={promise}>
        <Card className="flex-col">
          <div className="py-2 px-2 md:px-4">
            <EmailSection email={profileData?.email} onComplete={onChange} />
          </div>
          <div className="py-2 px-2 md:px-4">
            <AddressSection
              address={profileData?.address}
              onComplete={onChange}
            />
          </div>
          <div className="py-2 px-2 md:px-4">
            <PhoneSection phone={profileData?.phone} onComplete={onChange} />
          </div>
          <div className="py-2 px-2 md:px-4">
            <PaymentMethodSection onSubmit={updatePaymentMethod} />
          </div>
        </Card>

        <PharmacySection />

        <div className="px-4">
          <Button
            outline
            className="mx-auto w-full md:max-w-xl mt-4"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </Elements>
    </BasePatientPortalView>
  );
};

export default Profile;
