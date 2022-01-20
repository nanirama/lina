/**
 * Provider/EMR related API routes
 */
import express from "express";
import { authenticateProvider } from "../middleware/jwt_auth";
import * as providerController from "../controllers/provider/provider";
import * as noteController from "../controllers/provider/notes";
import * as schedulingController from "../controllers/provider/scheduling";
import * as chartController from "../controllers/provider/chart";
import * as userController from "../controllers/user";
import * as treatController from "../controllers/provider/treat";
import * as templateController from "../controllers/provider/templates";
import { handleErrors } from "../middleware/error_handler";

const router = express.Router();

router.use(authenticateProvider);

router.get("/me", providerController.me);
router.post("/update_email", userController.updateEmail);
router.post("/update_phone", userController.updatePhone);
router.post("/update_password", userController.updatePassword);
router.post("/treat_auth", treatController.treatLogin);
router.get("/treat_token", treatController.getToken);
router.get("/patients", providerController.getPatients);

// List appointments and pages
router.post("/availability", providerController.markAvailability);
router.get("/availability", providerController.getSlots);
router.get("/appointments", providerController.getAppointments);
router.post(
  "/remove_availability/:slotId",
  providerController.deleteAvailability
);
router.get("/appointment/:appointmentId", schedulingController.getAppointment);
router.post(
  "/appointment/:appointmentId",
  schedulingController.updateAppointment
);

// Individual patient/appointment pages
router.get("/patient/:patientId/chart", chartController.getPatientChart);
router.put("/patient/:patientId/chart", chartController.updatePatientChart);

router.get("/patient/:patientId/medications", chartController.getMedications);
router.post("/patient/:patientId/medications", chartController.addMedication);
router.put(
  "/patient/:patientId/medications/:medicationId",
  chartController.updateMedication
);

router.get("/patient/:patientId/allergies", chartController.getAllergies);
router.post("/patient/:patientId/allergies", chartController.addAllergy);
router.put(
  "/patient/:patientId/allergies/:allergyId",
  chartController.updateAllergy
);

router.get("/patient/:patientId/notes", noteController.getNotes);
router.post("/patient/:patientId/notes", noteController.createNote);

router.get("/patient/:patientId/info", chartController.getPatientInfo);

// Notes for patient chart
router.post("/notes/create", noteController.createNote);
router.get("/notes/:noteId", noteController.getNote);
router.post("/notes/:noteId", noteController.updateNote);

router.get("/templates", templateController.getTemplates);
router.post("/templates", templateController.createTemplate);
router.put("/templates/:templateId", templateController.updateTemplate);

router.use(handleErrors);

export default router;
