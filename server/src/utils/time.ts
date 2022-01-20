/**
 * Utilities for managing dates/times
 */
const EASTERN_TIME = "America/New_York";

export const slotDateToTimestamp = (date: Date, slotTime: string) => {
  return new Date(date.toLocaleDateString() + " " + slotTime).getTime();
};

export const toTimeString = (date: Date, timeZone?: string) => {
  return date.toLocaleTimeString("en-US", {
    timeZone: timeZone ?? EASTERN_TIME,
    timeZoneName: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};
