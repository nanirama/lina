/**
 * simple utility functions
 */

export const emailIsValid = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const getOrdinalNum = (n: number) => {
  return (
    n +
    (n > 0
      ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : "")
  );
};

export const dateToTimeString = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    // timeZoneName: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
};

export const dayWithOrdinal = (date: Date) => {
  return `${getOrdinalNum(date.getDate())}`;
};

export const getDayName = (date: Date) => {
  return date.toLocaleDateString("default", { weekday: "long" });
};

export const getMonthName = (date: Date) => {
  return date.toLocaleString("default", { month: "long" });
};

export const formatPhoneNumber = (phone: string) =>
  phone.replace(/\D+/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

export const capitalize = (s: string) =>
  (s.charAt(0).toUpperCase() + s.slice(1)).trim();

export const getTimezoneAbbreviation = () =>
  new Date()
    .toLocaleTimeString("en-us", { timeZoneName: "short" })
    .split(" ")[2];

export const getTimezoneName = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const normalizeDateToUTC = (date: Date): string => {
  const utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getUTCDate());
  return new Date(utcDate).toISOString();
};
