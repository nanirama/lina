/**
 * Cron job used to ask patients to validate their address if
 * the address differs from registration state
 */
import { subHours } from "date-fns";
import Logger from "../../config/logger";
import { Patient } from "../../models/patient";
import { sendTechAdminNotification } from "../notifications";

export const validateNewRegistrationAddresses = async () => {
  const today = new Date();
  const yesterday = subHours(today, 24);
  const newPatients = await Patient.query()
    .whereBetween("createdAt", [yesterday, today])
    .withGraphFetched({ user: { address: true } });
  const patientsWithStateMismatch = newPatients.filter((patient) => {
    if (patient.subscriptionStatus !== "ACTIVE") {
      return false;
    }
    if (!patient.user.address) {
      return false;
    }
    return patient.user.address.state !== patient.residenceState;
  });

  const msg = patientsWithStateMismatch
    .map(
      (patient) =>
        `${patient.user.fullName()} registration state: ${patient.residenceState
        } address state: ${patient.user.address?.state}`
    )
    .join("\n");
  if (msg) {
    await sendTechAdminNotification(msg);
  } else {
    Logger.info(
      `${newPatients.length} new accounts, none with mismatched addresses`
    );
  }
};
