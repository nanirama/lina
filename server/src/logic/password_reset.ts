/**
 * Password reset logic for both provider/patient
 */
import { User } from "../models/user";
import { resetPassword } from "./user";
import { sendSimpleEmail } from "../lib/sendgrid";
import { useToken, generateToken } from "./token";
import { UnauthorizedError } from "../utils/errors";

/**
 *
 * @param email user's email
 */
export const sendResetEmail = async (email: string) => {
  const user = await User.query().findOne({ email });
  if (!user) {
    return;
  }
  const resetToken = await generateToken(user, "reset_password");
  const link =
    user.accountType === "PATIENT"
      ? `https://www.hellolina.com/password-reset?token=${resetToken.value}`
      : `https://healthgent-provider.vercel.app/password-reset?token=${resetToken.value}`;
  const emailText = `
  Please use this link to reset your password. It will be valid for 6 hours.

 ${link}
  `;
  await sendSimpleEmail(email, "Reset your password", emailText);
};

/**
 *
 * @param token Password reset token
 * @param password new password for user
 */
export const resetPasswordWithToken = async (
  token: string,
  password: string
) => {
  const resetToken = await useToken(token, "reset_password");
  if (!resetToken) {
    throw new UnauthorizedError("Invalid or expired token");
  }
  const user = await User.query().findById(resetToken.userId);
  await resetPassword(user, password);
};
