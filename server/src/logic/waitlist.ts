/**
 * Unauthenticated endpoint to add to waitlsit
 */
import { WaitlistEmail } from "../models/waitlist_email";

export const addToWaitlist = async (email: string, state: string) => {
  await WaitlistEmail.query().insert({ email, state });
};
