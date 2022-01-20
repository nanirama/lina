/**
 * Authentication endpoints
 */
import { Request, Response } from "express";
import {
  login as userLogin,
  superuserLogin,
  loginAs as userLoginAs,
  signToken,
} from "../../logic/auth";
import { check, validationResult } from "express-validator";
import {
  sendResetEmail,
  resetPasswordWithToken,
} from "../../logic/password_reset";
import { createPatient } from "../../logic/registration";
import { UserReferrerType } from "../../models/user_referrer";
import { markSignup } from "../../lib/facebook";
import { UserRegistration } from "../../lib/api_types";

export const signup = async (req: Request, res: Response) => {
  check("intakeId", "No intake form submitted").isUUID().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    errors.throw();
  }
  const { intakeId, userReferrer, residenceState, ...body } =
    req.body as UserRegistration;
  const user = await createPatient(
    body,
    intakeId,
    residenceState,
    userReferrer as UserReferrerType | undefined
  );
  const token = signToken(user.id);
  const { firstName, lastName, email, phone } = user;
  await res.json({ success: true, token, firstName, lastName, email });

  // Mark FB conversion event
  const userAgent = req.headers["user-agent"];
  markSignup({ email, phone, userAgent });
};

export const login = async (req: Request, res: Response) => {
  const email = new String(req.body.email).toLowerCase().trim();
  const password = req.body.password;
  const token = await userLogin(email, password);
  res.json({ success: true, token });
};

export const superuser = async (req: Request, res: Response) => {
  const token = await superuserLogin(req.body.password);
  res.json({ success: true, token });
};

export const loginAs = async (req: Request, res: Response) => {
  const token = await userLoginAs(req.body.email);
  res.json({ success: true, token });
};

export const forgotPassword = async (req: Request, res: Response) => {
  await check("email", "Email is not valid").isEmail().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  const email = new String(req.body.email).toLowerCase().trim();
  sendResetEmail(email);
  res.json({ success: true });
};

export const resetPassword = async (req: Request, res: Response) => {
  await check("token", "Token is not valid").isString().run(req);
  await check("password", "Password is not valid").isString().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  const { token, password } = req.body;
  await resetPasswordWithToken(token, password);
  res.json({ success: true });
};
