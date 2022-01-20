/**
 * google login related logic, which is no longer used.
 */
import { OAuth2Client } from "google-auth-library";
import { UnauthorizedError } from "../utils/errors";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const VALID_ISS = ["accounts.google.com", "https://accounts.google.com"];

const client = new OAuth2Client(CLIENT_ID);

interface GoogleOAuthResult {
  email: string;
  firstName: string;
  lastName: string;
}

export const verifyToken = async (
  token: string
): Promise<GoogleOAuthResult> => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    // can be multiple apps [CLIENT1, CLIENT2...]
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload) {
    throw new UnauthorizedError("Invalid google token");
  }
  if (payload["aud"] !== CLIENT_ID) {
    throw new UnauthorizedError("Invalid google application");
  }
  if (VALID_ISS.indexOf(payload["iss"]) === -1) {
    throw new UnauthorizedError("Invalid google issuer");
  }
  if (payload["exp"] < new Date().getTime() / 1000) {
    throw new UnauthorizedError("Expired google token");
  }
  // const googleUserId = payload["sub"];
  // TODO(sbb): We can get a picture here too
  return {
    email: payload["email"] as string,
    firstName: payload["given_name"] || "",
    lastName: payload["family_name"] || "",
  };
};
