/**
 * Retool Admin API routes
 */
import express from "express";
import { authenticateRetool } from "../middleware/jwt_auth";
import * as adminController from "../controllers/admin";
import { handleErrors } from "../middleware/error_handler";

const router = express.Router();

// TODO(sbb): Change this
router.use(authenticateRetool);

router.post("/providers", adminController.providerSignup);
router.post("/providers/:providerId/token", adminController.providerToken);
router.put("/providers/:providerId", adminController.updateProvider);

// Common endpoints
router.post("/user/:userId/send_reset_link", adminController.sendPasswordReset);

// Patient Endpoints
router.get(
  "/patient/:patientId/onboarding_status",
  adminController.getOnboardingStatus
);

router.post(
  "/patient/:patientId/send_reschedule_prompt",
  adminController.sendPatientReschedulePrompt
);
router.put("/patient/:patientId/update", adminController.updatePatient);
router.post(
  "/patient/:patientId/treat_record",
  adminController.createTreatRecord
);
router.post("/patient/:patientId/verify_id", adminController.verifyId);
router.post(
  "/patient/:patientId/update_address",
  adminController.updatePatientAddress
);
router.post(
  "/patient/:patientId/update_email",
  adminController.updatePatientEmail
);
router.post(
  "/patient/:patientId/update_phone",
  adminController.updatePatientPhone
);
router.post(
  "/patient/:patientId/emergency_contact",
  adminController.updatePatientEmergencyContact
);

// Appointment endpoints
router.post(
  "/appointments/:appointmentId/mark_confirmed",
  adminController.markAppointmentConfirmed
);
router.post(
  "/appointments/:appointmentId/mark_canceled",
  adminController.markAppointmentCanceled
);
router.post(
  "/appointments/:appointmentId/mark_complete",
  adminController.markAppointmentComplete
);

router.post("/schedule_appointment", adminController.scheduleAppointment);

router.delete("/slots/:slotId", adminController.deleteProviderSlot);

// Pharmacy endpoints
router.get("/pharmacies/:pharmacyId", adminController.getPharmacy);
router.get("/pharmacies", adminController.pharmacySearch);

router.get("/version", adminController.getAppVersion);
//-- Providers
router.post(
  "/provider/:providerId/availability",
  adminController.markAvailability
);
router.get("/provider/:providerId/availability", adminController.getSlots);
router.post(
  "/provider/:providerId/remove_availability/:slotId",
  adminController.deleteAvailability
);

//- Admin only Reports
router.get("/reports/provider_utilization", adminController.getProviderUtilization);
router.get("/reports/state_utilization", adminController.getStateUtilization);


router.post(
  "/send_ops_digest",
  adminController.triggerSendOpsNotificationDigest
);
router.use(handleErrors);

export default router;
