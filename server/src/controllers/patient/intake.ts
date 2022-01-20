import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { checkUserByPhone } from "../../logic/user";

/**
 * This file should probably be renamed, but just checks to make sure
 * that a patient hasn't registered already.
 */
export const checkIfUserExists = async (req: Request, res: Response) => {
  await check("phone", "Phone number is required").isString().run(req);
  await check("firstName", "Full name is required").isString().run(req);
  await check("lastName", "Full name is required").isString().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }

  await checkUserByPhone(req.body.phone);
  res.json({});
};
