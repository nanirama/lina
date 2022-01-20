/**
 * API routes that don't require authentication
 */
import express from "express";
import { handleErrors } from "../middleware/error_handler";
import { authenticateSuperuser } from "../middleware/jwt_auth";
import * as quizController from "../controllers/patient/quiz";
import * as patientAuthController from "../controllers/patient/patient_auth";
import * as patientStatusController from "../controllers/patient/onboarding_status";
import * as waitlistController from "../controllers/patient/waitlist";
import * as referralController from "../controllers/referrals";
import * as eligibilityController from "../controllers/eligibility";
import * as intakeController from "../controllers/patient/intake";

const router = express.Router();

router.post("/submit_quiz", quizController.uploadQuiz);
router.get("/check_intake", quizController.checkEligibility);
router.post("/join_waitlist", waitlistController.joinWaitlist);

router.post("/signup", patientAuthController.signup);
router.post("/login", patientAuthController.login);
router.post("/superuser", patientAuthController.superuser);

router.use("/login_as", authenticateSuperuser);
router.post("/login_as", patientAuthController.loginAs);

router.post("/forgot_password", patientAuthController.forgotPassword);
router.post("/reset_password", patientAuthController.resetPassword);
router.get("/patient/status", patientStatusController.getOnboardingStatus);

router.post("/start_intake", intakeController.checkIfUserExists);

router.post("/referral_code", referralController.getReferralCode);
router.get("/check_zip", eligibilityController.checkZipEligbility);
router.get("/states", eligibilityController.getEligibleStates);

router.use(handleErrors);

export default router;
