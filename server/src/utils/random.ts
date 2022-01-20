/**
 * Utilities for generating random strings
 */

export const generateRandomString = (length: number) => {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, length);
};

export const generateRandomNumericalString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.trunc(Math.random() * 10);
  }
  return result;
};
