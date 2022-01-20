/**
 * Operations common to all users
 */
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import {
  updatePhone as setPhone,
  updateEmail as setEmail,
  changePassword,
} from "../../logic/user";

export const updateEmail = async (req: Request, res: Response) => {
  await check("email", "Email is not valid").isEmail().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  await setEmail(req.context.user, req.body.email);
  res.json({ success: true });
};

export const updatePhone = async (req: Request, res: Response) => {
  await check("phone", "Phone is not valid").isMobilePhone("en-US").run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  await setPhone(req.context.user, req.body.phone);

  res.json({ success: true });
};

export const updatePassword = async (req: Request, res: Response) => {
  await check("currentPassword", "Current password is required").isString();
  await check("newPassword", "New password is required").isString();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  await changePassword(
    req.context.user,
    req.body.currentPassword,
    req.body.newPassword
  );

  res.json({ success: true });
};
