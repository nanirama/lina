import { verifyToken } from "../lib/google";
import { getRefreshTokenFromAuthCode } from "../lib/treat";
import { Provider } from "../models/provider";
import { findUserByEmail } from "./user";

/**
 *
 * @param provider Provider who is logging into Treat
 * @param authCode Auth code passed to the frontend by the Treat OAuth flow
 * @returns OAuth refresh token for Treat
 */
export const providerTreatLogin = async (
  provider: Provider,
  authCode: string
) => {
  const auth = await getRefreshTokenFromAuthCode(authCode);
  await provider.$query().patch({ treatRefreshToken: auth.refreshToken });
  return auth;
};

/**
 * Unused
 */
export const getUserFromGoogleToken = async (token: string) => {
  const result = await verifyToken(token);
  const user = await findUserByEmail(result.email);
  return user;
};
