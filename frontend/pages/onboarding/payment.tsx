/**
 * Page that displays checkout/payment. Will redirect to
 * scheduling if the patient hasn't picked a slot yet.
 */
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import Payment from "../../components/onboarding/Payment";
import { useAppContext } from "../../context/AppContext";
import { bookAppointment } from "../../lib/api";
import { logEvent } from "../../lib/event_logging";

interface Props {
  timeslot: string;
}

const PaymentPage: NextPage<Props> = ({ timeslot }) => {
  const router = useRouter();
  const { discountCode, onboarding } = useAppContext();
  useEffect(() => {
    if (!onboarding.selectedTimeSlot) {
      router.push("/onboarding/schedule");
    }
  }, []);
  const onComplete = () => {
    logEvent("purchase");
    bookAppointment(timeslot).then(() => {
      router.push("/onboarding/payment-success");
    });
  };
  useEffect(() => {
    logEvent("start-checkout");
  }, []);

  return (
    <OnboardingContainer
      stage="checkout"
      percent={70}
      title="Lina - Confirm your appointment"
    >
      <Payment
        onComplete={onComplete}
        discountCode={discountCode || "FIRSTMO5"}
      />
    </OnboardingContainer>
  );
};

PaymentPage.getInitialProps = ({ query }) => {
  const timeslot = query.timeslot as string;
  return { timeslot };
};

export default PaymentPage;
