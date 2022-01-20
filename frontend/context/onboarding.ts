/**
 * Logic around determining the onboarding flow. The actual data is stored in AppContext,
 * but this is the state machine for user onboarding which determines the next step they
 * need to do.
 */
import { OnboardingStatus } from "@healthgent/server/src/lib/api_types";

export type OnboardingStage =
  | "pre-screen"
  | "questionnaire"
  | "registration"
  | "results"
  | "scheduling"
  | "checkout"
  | "payment-success"
  | "dob"
  | "phone"
  | "intake-questions"
  | "verification"
  | "address"
  | "emergency-contact"
  | "pharmacy-selection"
  | "pcp-info"
  | "therapist-info"
  | "complete";

export const getNextOnboardingState = (
  status?: OnboardingStatus
): OnboardingStage => {
  if (!status || Object.keys(status).length === 0) {
    return "questionnaire";
  }
  if (!status.hasPaymentMethod) {
    return "checkout";
  } else if (!status.hasDob) {
    return "dob";
  } else if (!status.hasPhone) {
    return "phone";
  } else if (!status.intakeComplete) {
    return "intake-questions";
  } else if (!status.addressComplete) {
    return "address";
  } else if (!status.scheduled) {
    return "scheduling";
  } else if (!status.idComplete) {
    return "verification";
  } else if (!status.emergencyContactComplete) {
    return "emergency-contact";
  } else if (!status.selectedPharmacy) {
    return "pharmacy-selection";
  } else if (!status.pcpPreference) {
    return "pcp-info";
  } else if (!status.therapistPreference) {
    return "therapist-info";
  }
  return "complete";
};

export const getRedirectUrl = (stage: OnboardingStage) => {
  const mapping = {
    "pre-screen": "/onboarding/intro/start",
    questionnaire: "/onboarding/questionnaire",
    registration: "/onboarding/complete/name",
    results: "/onboarding/results",
    checkout: "/onboarding/payment",
    scheduling: "/onboarding/schedule",
    dob: "/onboarding/dob",
    phone: "/onboarding/phone",
    "payment-success": "/onboarding/payment-success",
    // TODO(sbb): a bit misleading
    "intake-questions": "/onboarding/payment-success",
    address: "/onboarding/address",
    verification: "/onboarding/verification",
    "emergency-contact": "/onboarding/emergency-contact",
    "pharmacy-selection": "/onboarding/pharmacy",
    "pcp-info": "/onboarding/pcp-info",
    "therapist-info": "/onboarding/therapist-info",
    complete: "/onboarding/confirmation",
  };
  return mapping[stage];
};
