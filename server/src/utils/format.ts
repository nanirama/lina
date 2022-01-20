/**
 * simple utility functions
 */
export const phoneToDigits = (phone: string) => phone.replace(/\D+/g, "");
export const formatDate = (date: Date) => date.toLocaleDateString("default");
export const formatTime = (time: string) => time.substr(0, 5);
export const formatEmail = (email: string) => email.toLowerCase();

export const formatFloat = (n: number | string, digits = 2) => {
  return parseFloat(`${n}`).toFixed(digits);
};
