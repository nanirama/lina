import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { createReferralCode } from "../../logic/referrals";

/**
 * Used to generate a referral code for a patient.
 */
export const getReferralCode = async (req: Request, res: Response) => {
  await check("email", "Must provide an email").isEmail().run(req);
  await check("name", "Must provide a name").isString().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }

  const refcode = await createReferralCode(
    req.body.email,
    req.body.name,
    req.body.campaign
  );

  res.json({ success: true, code: refcode.code });
};
