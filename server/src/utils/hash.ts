/**
 * Simple functions for hashing strings
 */
import crypto from "crypto";

/**
 *
 * @param s string content to hash
 * @returns hash as a hex string
 */
export const sha256Hash = (s: string) => {
  return crypto.createHash("sha256").update(s).digest("hex");
};
