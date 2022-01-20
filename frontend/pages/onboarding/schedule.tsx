/**
 * Page that displays calendar/time picker for patient to pick
 * a time with a provider
 */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import AppointmentSelection from "../../components/scheduling/AppointmentSelection";
import Spinner from "../../components/svg/Spinner";
import { useAppContext } from "../../context/AppContext";
import { bookAppointment, getOnboardingStatus } from "../../lib/api";
import { logEvent } from "../../lib/event_logging";

interface Props { }

const FindingProvider = () => {
  return (
    <div className="px-4">
      <h1 className="text-center text-2xl mb-2">
        We&apos;re finding the best provider for you
      </h1>
      <div className="text-center text-sm mb-6">
        We&apos;re finding the optimal provider for your needs.
      </div>
      <div className="text-coral w-16 h-16 justify-center mx-auto">
        <Spinner />
      </div>
    </div>
  );
};

const Schedule: React.FC<Props> = () => {
  const router = useRouter();
  const [showScheduling, setShowScheduling] = useState(false);
  const { onboarding } = useAppContext();

  useEffect(() => {
    setTimeout(() => {
      setShowScheduling(true);
      logEvent("start-scheduling");
    }, 2500);
  }, []);

  const onComplete = (timeslot: string) => {
    onboarding.setSelectedTimeSlot(timeslot);
    getOnboardingStatus().then((r) => {
      if (r.hasPaymentMethod) {
        bookAppointment(timeslot).then(() => {
          router.push("/onboarding/verification");
        });
      } else {
        router.push(`/onboarding/payment?timeslot=${timeslot}`);
      }
    });
  };
  return (
    <OnboardingContainer
      stage="scheduling"
      percent={90}
      title="Lina - Schedule Appointment"
    >
      {showScheduling ? (
        <AppointmentSelection onComplete={onComplete} isOnboarding />
      ) : (
        <FindingProvider />
      )}
      <div className="mb-8"></div>
    </OnboardingContainer>
  );
};

export default Schedule;
