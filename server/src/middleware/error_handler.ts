import { Request, Response } from "express";
import { GeneralError } from "../utils/errors";
import { Result, ValidationError } from "express-validator";
import logger from "../config/logger";

/**
 * Used to return the correct HTTP code for a given error type in a request
 */

export const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  next: () => any
) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method
    } - ${req.ip}`
  );
  if (process.env.NODE_ENV === "development") {
    logger.error(err.stack);
  }
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: "error",
      error: err.message,
    });
  }

  const validationError = err as Result<ValidationError>;

  if (validationError.array) {
    return res.status(400).json({
      status: "error",
      error: validationError.array()[0].msg,
    });
  }

  return res.status(500).json({
    status: "error",
    error: err.message,
  });
};
