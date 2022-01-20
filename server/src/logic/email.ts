/**
 * Email verification
 * Unused at the moment
 */
import { User } from "../models/user";
import { sendSimpleEmail } from "../lib/sendgrid";
import { generateToken, useToken } from "./token";
import { UnauthorizedError } from "../utils/errors";

export const sendVerificationEmail = async (user: User) => {
  const token = await generateToken(user, "email_confirmation");
  const link = `https://www.joinhealthgent.com/verify-email?token=${token.value}`;
  const emailText = `
        To verify your email address, please click the link: ${link}
    `;
  sendSimpleEmail(user.email, "Confirm your email address", emailText);
};

export const verifyEmail = async (token: string) => {
  const validToken = await useToken(token, "email_confirmation");

  if (!validToken) {
    throw new UnauthorizedError("Invalid email verification");
  }

  await User.query()
    .findById(validToken.userId)
    .patchAndFetch({ verifiedEmail: true });
};
