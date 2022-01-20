import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { addToWaitlist } from "../../logic/waitlist";

/**
 * Add a user to the waitlist. This does not need authentication.
 */
export const joinWaitlist = async (req: Request, res: Response) => {
  await check("email", "Email is not valid").isEmail().run(req);
  await check("state", "State is not valid").isString().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  await addToWaitlist(req.body.email, req.body.state);
  res.json({ success: true });
};
