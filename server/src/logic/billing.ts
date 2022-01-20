/**
 * Billing related logic, used to determine active/inactive patients.
 * See logic/stripe for stripe API use.
 */
import Logger from "../config/logger";
import { Patient } from "../models/patient";
import { sendBillingReminder } from "./notifications";
import { syncPatientsActiveStatus } from "./pharmacy";
import { getActiveCustomerIds, getPastDueCustomerIds } from "./stripe";

export const markPatientSubscriptionStatus = async () => {
  const activeCustomerIds = await getActiveCustomerIds();
  const pastDueCustomerIds = await getPastDueCustomerIds();
  Logger.info(
    `Stripe API returned ${activeCustomerIds.length} active customers, with ${pastDueCustomerIds.length} customers past due on invoices`
  );

  const numActive = await Patient.query()
    .whereIn("stripeCustomerId", activeCustomerIds)
    .patch({ subscriptionStatus: "ACTIVE" });

  Logger.info(`Marked ${numActive} rows for active patients`);

  const numInactive = await Patient.query()
    .whereNotIn("stripeCustomerId", [
      ...activeCustomerIds,
      ...pastDueCustomerIds,
    ])
    .orWhereColumn("stripeCustomerId", null)
    .patch({ subscriptionStatus: "INACTIVE" });
  Logger.info(`Marked ${numInactive} rows for inactive patients`);

  const numPaymentFailed = await Patient.query()
    .whereIn("stripeCustomerId", pastDueCustomerIds)
    .patch({ subscriptionStatus: "PAST_DUE" });

  Logger.info(`Marked ${numPaymentFailed} rows for patients past due`);

  const pharmacySyncResult = await syncPatientsActiveStatus();
  Logger.info(
    `Marked ${pharmacySyncResult.numActive} patients active / ${pharmacySyncResult.numInactive} inactive in e-Prescribe`
  );
};

const getCurrentPatientsWithFailedPayments = async () => {
  const pastDueCustomerIds = await getPastDueCustomerIds();

  const patients = await Patient.query()
    .whereIn("stripeCustomerId", pastDueCustomerIds)
    .withGraphFetched({ user: true });
  return patients;
};

export const sendBillingReminders = async () => {
  const patients = await getCurrentPatientsWithFailedPayments();

  patients.forEach(async (patient) => {
    Logger.info(
      `Notifying patient ${patient.user.firstName} user id: ${patient.userId} about invoice`
    );
    await sendBillingReminder(patient.user.firstName, patient.user.phone);
  });
};
