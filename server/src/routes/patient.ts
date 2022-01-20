/**
 * Patient facing API routes
 */
import express from "express";

import { authenticatePatient } from "../middleware/jwt_auth";
import * as patientController from "../controllers/patient/patient";
import * as appointmentController from "../controllers/patient/appointment";
import * as paymentController from "../controllers/patient/payment";
import * as verifyIdController from "../controllers/patient/verify_id";
import * as prescriptionsController from "../controllers/patient/prescriptions";
import * as pharmacyController from "../controllers/patient/pharmacy";
import * as progressTrackingController from "../controllers/patient/progress_tracking";
import { handleErrors } from "../middleware/error_handler";

const router = express.Router();
router.use(authenticatePatient);

// Logged in patient flows
router.get("/me", patientController.getProfile);
router.post("/update_address", patientController.updateAddress);
router.post("/update_phone", patientController.updatePhone);
router.post("/update_email", patientController.updateEmail);
router.post("/update_birthdate", patientController.updateBirthdate);
router.post("/consent", patientController.consent);
router.post("/emergency_contact", patientController.emergencyContact);
router.post("/update_intake", patientController.updateIntakeResponse);
router.post("/onboarding_complete", patientController.onboardingCompelete);

router.post("/verify_id", verifyIdController.verifyId);

// Payment
router.get("/payment_setup", paymentController.createIntent);
router.post("/confirm_payment", paymentController.confirmPaymentMethod);
router.post("/update_payment_method", paymentController.updatePaymentMethod);

// Appointments
router.get("/availability", appointmentController.getProviderAvailability);
router.post("/schedule_appointment", appointmentController.scheduleAppointment);
router.get("/upcoming_appointment", appointmentController.upcomingAppointment);
router.get(
  "/previous_appointments",
  appointmentController.previousAppointments
);

// Prescriptions
router.get("/prescriptions", prescriptionsController.getPrescriptions);
router.get("/pharmacies", pharmacyController.getPharmacies);
router.get("/pharmacy", pharmacyController.getCurrentPharmacy);
router.post("/pharmacy", patientController.updatePharmacyPreference);

// Progress Tracking
router.get("/progress_history", progressTrackingController.getHistory);
router.post("/submit_checkin", progressTrackingController.submitCheckin);

// External Providers
router.post("/update_pcp", patientController.setPrimaryCarePhysician);
router.post("/update_therapist", patientController.setExternalTherapist);

router.use(handleErrors);

export default router;
