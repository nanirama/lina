/**
 * List of event names we use in our frontend.
 * Note that these don't always correspond to platform specific
 * event names - see index.ts for examples of how that mapping is done.
 */
export type EventType =
  | "page-view"
  | "start-assessment"
  | "start-questionnaire"
  | "complete-assessment"
  | "start-lead"
  | "lead"
  | "create-account"
  | "view-results"
  | "eligible"
  | "ineligible"
  | "view-plans"
  | "start-checkout"
  | "purchase"
  | "start-scheduling"
  | "intake-error"
  | "google-signup"
  | "already-registered"
  | "already-registered-google"
  | "start-zip"
  // Unused events
  | "start-email"
  | "join-waitlist";

export interface EventOptions {
  url?: string;
  category?: string;
  label?: string;
  value?: number;
  [x: string]: any;
}

export interface UserIdentifiers {
  id?: string;
  phone?: string;
  email?: string;
  gender?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
}
