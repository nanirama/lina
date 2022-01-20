/**
 *
 * @param unencoded Unencoded string
 * @returns Base64 encoded string
 */
const encode = (unencoded: string) => {
  return Buffer.from(unencoded || "").toString("base64");
};

/**
 *
 * @param encoded Base64 encoded string
 * @returns decoded string
 */
const decode = (encoded: string) => {
  return Buffer.from(encoded, "base64").toString("utf8");
};

/**
 *
 * @param unencoded Unencoded string
 * @returns URL friendly base64 representation
 */
export const urlEncodeBase64 = (unencoded: string) => {
  const encoded = encode(unencoded);
  return encoded.replace("+", "-").replace("/", "_").replace(/=+$/, "");
};

/**
 *
 * @param encoded URL-friendly base64 encoded string
 * @returns decoded string
 */
export const urlDecodeBase64 = (encoded: string) => {
  encoded = encoded.replace("-", "+").replace("_", "/");
  while (encoded.length % 4) encoded += "=";
  //   return decode(encoded);
  return encoded;
};
