/**
 * Logic that's common to all user types.
 */

import { formatPhone } from "../lib/twilio";
import { User } from "../models/user";
import { BadRequestError, UserExistsError } from "../utils/errors";
import { hashPassword, checkPassword } from "./auth";
import { isBefore, subYears } from "date-fns";

export const checkUserByPhone = async (phoneNumber: string) => {
  const phone = await formatPhone(phoneNumber);
  if (!phone) {
    throw new BadRequestError("Please provide a valid phone number");
  }
  // TODO(sbb): use this somewhere
  const user = await User.query().where({ phone }).first();
  if (user) {
    throw new UserExistsError("User with this phone number already exists");
  }
  return phone;
};

export const findUserByEmail = async (email: string) => {
  return await User.query().findOne({ email });
};

/* birthdate should be on ISO format */
export const updateBirthdate = async (user: User, birthdate: string) => {
  if (!isBefore(new Date(birthdate), subYears(new Date(), 18))) {
    throw new BadRequestError("Birthdate must be greater than 18 years");
  }
  return User.query().updateAndFetchById(user.id, { birthdate });
};

export const updateEmail = async (user: User, email: string) => {
  const duplicateEmailUser = await User.query()
    .where({ email })
    .whereNot({ id: user.id });
  if (duplicateEmailUser.length) {
    throw new BadRequestError("Email is already in use");
  }
  return await User.query().updateAndFetchById(user.id, { email });
};

export const updatePhone = async (user: User, phone: string) => {
  return await User.query().updateAndFetchById(user.id, { phone });
};

export const resetPassword = async (user: User, newPassword: string) => {
  const password = await hashPassword(newPassword);
  return await User.query().updateAndFetchById(user.id, { password });
};

export const changePassword = async (
  user: User,
  oldPassword: string,
  newPassword: string
) => {
  const validPassword = await checkPassword(oldPassword, user.password);
  if (!validPassword) {
    throw new BadRequestError("Incorrect current password");
  }
  await resetPassword(user, newPassword);
};
