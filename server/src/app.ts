/**
 * The core server application. Sets up routes, middleware, logging, error handling, etc.
 */
import express from "express";
require("express-async-errors");
import cors from "cors";
import morgan from "morgan";
import * as Sentry from "@sentry/node";
import { loggerStream } from "./config/logger";
import { handleErrors } from "./middleware/error_handler";
import patientRoutes from "./routes/patient";
import providerRoutes from "./routes/provider";
import adminRoutes from "./routes/admin";
import messagingRoutes from "./routes/messaging";
import stripeRoutes from "./routes/stripe";
import publicRoutes from "./routes/public";

if (process.env.NODE_ENV !== "development") {
  Sentry.init({ dsn: process.env.SENTRY_URL });
}

const app = express();
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined", { stream: loggerStream() }));
app.use(cors());
app.set("port", process.env.PORT || 4000);

const healthcheckRouter = express.Router();
healthcheckRouter.get("/", (req, res) => {
  res.send({ success: true });
});
app.use("/", healthcheckRouter);

app.use("/api", publicRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", messagingRoutes);
app.use("/api/stripe", stripeRoutes);

// The error handler must be before any other error middleware and after all controllers
if (process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test") {
  app.use(Sentry.Handlers.errorHandler());
}

app.use(handleErrors);
export default app;
