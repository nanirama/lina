/**
 * Show appointment selection for logged in users
 * to book a follow up appointment
 */
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import BasePatientPortalView from "../../components/patient_portal/BasePatientPortalView";
import AppointmentSelection from "../../components/scheduling/AppointmentSelection";
import { bookAppointment } from "../../lib/api";

interface Props { }

const FollowupPage: NextPage<Props> = () => {
  const router = useRouter();
  const onComplete = (slotId: string) => {
    bookAppointment(slotId).then(() => router.push("/patient_portal/home"));
  };
  return (
    <BasePatientPortalView>
      <AppointmentSelection onComplete={onComplete} />
    </BasePatientPortalView>
  );
};

export default FollowupPage;
