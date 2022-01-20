import { OnboardingStatus } from "../lib/api_types";
import Address from "../models/address";
import { Appointment } from "../models/appointment";
import { EmergencyContact } from "../models/emergency_contact";
import { IntakeResponse } from "../models/intake";
import { User } from "../models/user";

/**
 * Returns steps the user has completed, for use by the frontend
 * to determine what the user needs to complete before their first appointment
 */
export const getPatientOnboardingStatus = async (
  user: User
): Promise<OnboardingStatus> => {
  const patientId = user.patient?.id;
  const appointment = await Appointment.query().where({ patientId }).first();
  const address = await Address.query().where({ userId: user?.id }).first();
  const emergencyContact = await EmergencyContact.query()
    .where({ patientId })
    .first();
  const intakeForm = await IntakeResponse.query().where({ patientId }).first();
  const addressComplete = !!address;
  const scheduled = !!appointment;
  const idComplete = !!user?.patient?.licenseFileId;
  const emergencyContactComplete = !!emergencyContact;
  const hasPaymentMethod =
    !!user?.patient?.stripeCustomerId &&
    !!user?.patient?.subscriptionStatus &&
    (user?.patient.subscriptionStatus === "ACTIVE" ||
      user?.patient.subscriptionStatus === "PAST_DUE");
  const hasPhone = !!user?.phone;
  const hasDob = !!user?.birthdate;
  const selectedPharmacy = !!user.patient?.treatPharmacyId;
  const pcpPreference = user.patient?.sharePcp !== null;
  const therapistPreference = user.patient?.shareTherapist !== null;
  return {
    hasPaymentMethod,
    addressComplete,
    scheduled,
    idComplete,
    emergencyContactComplete,
    intakeComplete: !!intakeForm?.response?.followUp,
    hasPhone,
    hasDob,
    selectedPharmacy,
    pcpPreference,
    therapistPreference,
  };
};

/**
 *
 * @param onboardingStatus user's onboarding status
 * @returns true if they have completed onboarding
 */
export const onboardingComplete = (
  onboardingStatus: OnboardingStatus
): boolean => {
  return (
    Object.keys(onboardingStatus).length > 0 &&
    Object.values(onboardingStatus).reduce((a, b) => a && b, true)
  );
};
