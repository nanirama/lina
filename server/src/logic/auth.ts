/**
 * Logic for password login and JSON Web token authentication.
 * For JWT details, see https://jwt.io/
 */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AccountType, User } from "../models/user";
import { verifyToken as verifyGoogleToken } from "../lib/google";
import { findUserByEmail } from "./user";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/errors";

// TODO(sbb): move this
export const JWT_SECRET = process.env.JWT_SECRET || "change_this";

export const hashPassword = async (password: string): Promise<string> =>
  await bcrypt.hash(password, 8);

export const checkPassword = async (password: string, userPassword: string) =>
  await bcrypt.compare(password, userPassword);

export const signToken = (userId: number): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });
};

export const verifyToken = async (token: string): Promise<User> => {
  const result: any = await jwt.verify(token, JWT_SECRET);
  if (!result) {
    throw new BadRequestError("Invalid token");
  }

  const { id } = result;
  const user = await User.query()
    .findById(id)
    // TODO(sbb): Add admin here
    .withGraphFetched("[patient,provider]");

  if (user.disabled) {
    throw new UnauthorizedError("Could not verify credentials");
  }
  return user;
};

export const signAdminToken = (adminType: string, expirySeconds: number) => {
  return jwt.sign(
    { adminType, accountType: AccountType.ADMIN, id: 1 },
    JWT_SECRET,
    { expiresIn: expirySeconds }
  );
};

export const verifyAdminToken = async (token: string, adminType: string) => {
  const result: any = await jwt.verify(token, JWT_SECRET);
  if (!result) {
    throw new BadRequestError("Invalid token");
  }

  if (result.adminType != adminType) {
    // TODO(sbb): is this the right http err
    throw new ForbiddenError("Invalid permission");
  }
  return true;
};

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const user = await User.query().findOne({ email });
  if (!user) {
    throw new NotFoundError("No user associated with that email");
  }

  if (user.disabled) {
    throw new UnauthorizedError("Can not log in");
  }

  const match = await checkPassword(password, user.password);
  if (!match) {
    throw new UnauthorizedError("Incorrect password");
  }
  return signToken(user.id);
};

export const superuserLogin = async (password: string): Promise<string> => {
  let user = await User.query().findOne({ email: "superuser@hellolina.com" });

  if (!user) {
    user = await User.query().insertGraphAndFetch({
      accountType: AccountType.SUPERUSER,
      firstName: "Super",
      lastName: "User",
      birthdate: "1990-01-01",
      phone: "19999999999",
      email: "superuser@hellolina.com",
      password: await hashPassword(process.env.SUPERUSER_PASSWORD as string),
      createdAt: new Date(),
      updatedAt: new Date(),
      verifiedEmail: true,
      verifiedPhone: true,
    });
  }

  const match = await checkPassword(password, user.password);
  if (!match) throw new UnauthorizedError("Incorrect password");

  return signToken(user.id);
};

export const loginAs = async (email: string): Promise<string> => {
  const user = await User.query().findOne({ email });
  if (!user) {
    throw new NotFoundError("There is no user with this email account");
  }
  return signToken(user.id);
};

export const googleLogin = async (googleToken: string) => {
  const result = await verifyGoogleToken(googleToken);
  const user = await findUserByEmail(result.email);
  if (!user) {
    throw new NotFoundError("No user associated with this Google account");
  }
  return signToken(user.id);
};
