/**
 * Messaging API routes, used by multiple user types
 */
import express from "express";
import { authenticateUser } from "../middleware/jwt_auth";
import * as messagingController from "../controllers/messaging";
import { handleErrors } from "../middleware/error_handler";

const router = express.Router();

router.use(authenticateUser);

router.get("/thread/:threadId", messagingController.getThread);
router.post("/thread/:threadId", messagingController.sendMessage);
router.get("/messages/unread", messagingController.getUnreadMessageCount);
router.get("/messages", messagingController.getMessages);
router.post("/create_thread", messagingController.createThread);

router.use(handleErrors);

export default router;
