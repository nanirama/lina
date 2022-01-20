/**
 * Settings page where the provider can modify basic details
 * and reset their password
 */
import React from "react";
import useSWR from "swr";

import BaseProviderView from "../components/core/BaseView";
import {
  getProfile,
  updateEmail,
  updatePassword,
  updatePhone,
} from "../lib/api";
import { EmailSection } from "../components/settings/EmailSection";
import { PhoneSection } from "../components/settings/PhoneSection";
import AddressSection from "../components/settings/AddressSection";
import PasswordSection from "../components/settings/PasswordSection";
import PrescribeAuthSection from "../components/settings/PrescribeAuthSection";

interface Props { }

const Settings: React.FC<Props> = () => {
  const { data: profile, mutate } = useSWR("/provider/profile", getProfile);
  if (!profile) {
    return <BaseProviderView>Loading profile...</BaseProviderView>;
  }
  return (
    <BaseProviderView>
      <div className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Account Settings
      </div>
      <div className="flex flex-col space-y-4">
        <EmailSection
          email={profile.email}
          onSubmit={(e: string) => updateEmail(e).then(() => mutate())}
        />
        <PhoneSection
          phone={profile.phone}
          onSubmit={(p: string) => updatePhone(p).then(() => mutate())}
        />
        <AddressSection address={profile.address} />
        <PasswordSection
          updatePassword={(op: string, np: string) =>
            updatePassword(op, np).then(() => mutate())
          }
        />
        <PrescribeAuthSection canPrescribe={profile.canPrescribe} />
      </div>
    </BaseProviderView>
  );
};

export default Settings;
