/**
 * Stripe related API routes
 */
import express from "express";
import * as stripeController from "../controllers/patient/payment";
import { handleErrors } from "../middleware/error_handler";

const router = express.Router();

router.post("/webhook", stripeController.handleWebhook);

router.use(handleErrors);

export default router;
