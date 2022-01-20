import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { verifyPatient } from "../../logic/verification";

/**
 * Takes a persona inquiry ID and verifies it is real
 */
export const verifyId = async (req: Request, res: Response) => {
  await check("inquiryId", "Inquiry ID is required").isString().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  await verifyPatient(req.context.user, req.body.inquiryId);
  res.json({ success: true });
};
