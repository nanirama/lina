/**
 * Logic used for generating/using login tokens
 */
import { User } from "../models/user";
import { Token, TokenType } from "../models/token";
import crypto from "crypto";

export const generateToken = async (user: User, tokenType: TokenType) => {
  await Token.query()
    .update({ used: true })
    .where({ userId: user.id, tokenType });
  const value = crypto.randomBytes(64).toString("hex");
  const expiration = new Date(new Date().getTime() + 60 * 60 * 6 * 1000);
  return await Token.query().insertAndFetch({
    userId: user.id,
    tokenType,
    value,
    used: false,
    expiration,
  });
};

export const useToken = async (value: string, tokenType: TokenType) => {
  const token = await Token.query().where({ value }).first();
  const now = new Date();
  if (
    !token ||
    token.used ||
    token.expiration < now ||
    token.tokenType !== tokenType
  ) {
    return;
  }
  return await token.$query().patchAndFetch({ used: true });
};
