/**
 * All API types used by the patient and provider frontends. See the api.ts files in those
 * respective directories to see how these are used within both.
 */
export type {
  AppointmentStatus,
  AppointmentChecklist,
} from "../models/appointment";
export type { ExternalProviderType } from "../models/external_provider";
export type { NoteData } from "../models/note";
export type { EmergencyContactType } from "../models/emergency_contact";
export type { MedicationType } from "../models/chart/medication";
export type { AllergyType } from "../models/chart/allergy";
export type { Prescription } from "../logic/pharmacy";
export type { SubscriptionStatus } from "../models/patient";
export type {
  QuizResponse,
  QuestionResponse,
  AnswerValue,
  FreeformMultipleQuestion,
  FreeformQuestion,
  MultipleChoiceQuestion,
  QuizQuestionBase,
  QuizType,
} from "../models/intake";
export type { UserReferrerType } from "../models/user_referrer";
import { QuestionResponse } from "../models/intake";
import { AppointmentStatus, AppointmentChecklist } from "../models/appointment";
import { NoteData } from "../models/note";
import { EmergencyContactType } from "../models/emergency_contact";
import { AllergyType } from "../models/chart/allergy";
import { MedicationType } from "../models/chart/medication";
import { UserReferrerType } from "../models/user_referrer";
import { SubscriptionStatus } from "../models/patient";

export interface Provider {
  firstName: string;
  lastName: string;
  providerId: string;
  bio: string;
  picUrl: string;
}

export interface UserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  birthdate?: string;
  phone: string;
  password: string;
  intakeId: string;
  residenceState: string;
  consent?: boolean;
  userReferrer?: UserReferrerType;
  timezone?: string;
}

export interface AvailabilitySlot {
  date: string;
  startTime: string;
  providerId: string;
  timeslotId: string;
}

export interface AvailabilityResponse {
  providers: Array<Provider>;
  slots: Array<AvailabilitySlot>;
}

export interface Appointment {
  provider: Provider;
  startTime: string;
  doxyLink: string;
}

export interface Address {
  streetAddress: string;
  unitNumber?: string;
  city: string;
  state: string;
  zip: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: Address;
  hasCompletedFirstAppointment: boolean;
  subscriptionStatus?: SubscriptionStatus;
}

export interface ProviderSlot {
  slotId: string;
  date: string;
  slotStart: string;
  slotEnd: string;
  appointment?: ProviderAppointment;
}

export interface PatientInfo {
  name: string;
  firstName: string;
  lastName: string;
  patientId: string;
  email: string;
  phone: string;
  primaryProvider: string;
  birthday: string;
}

interface ChartData {
  notes: Array<Note>;
}
export interface PatientChart {
  id: string;
  name: string;
  gender: string;
  birthday: string;
  phone: string;
  email: string;
  address: Address;
  emergencyContact: EmergencyContactType;
  adminNote?: string;
  upcomingAppointments: Array<{
    appointmentId: string;
    date: string;
    time: string;
  }>;
  chart: ChartData;
  intakeResponse?: IntakeResponse;
  intakeGadScore: number;
  intakePhqScore: number;
  licensePictureUrl: string;
  medications: Array<MedicationType>;
  allergies: Array<AllergyType>;
}

export interface IntakeResponse {
  answers: Array<QuestionResponse>;
}

export interface ProviderAppointment {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  date: Date;
  startTime: string;
  endTime: string;
  videoLink: string;
  note?: Note;
  timestamp: number;
  status: AppointmentStatus;
  checklist: AppointmentChecklist;
  psychotherapyNote?: {
    content: string;
  };
  treatEncounterId: string;
}

export interface Note {
  id: string;
  timestamp: number;
  providerName?: string;
  editable: boolean;
  locked: boolean;
  lockTime: Date;
  updatedAt: Date;
  data: NoteData;
}

export interface UpdatePsychotherapyNoteRequest {
  appointmentId: string;
  content: string;
}

type IntakeEvaluationQualification = "HG_YES" | "PENDING" | "HG_NO";
export interface IntakeEvaluationResponse {
  qualification: IntakeEvaluationQualification;
  anxiety?: {
    percent: number;
    level: string;
  };
  depression?: {
    percent: number;
    level: string;
  };
  adhd?: {
    percent: number;
    level: string;
  };
}

export interface OnboardingStatus {
  hasPaymentMethod: boolean;
  scheduled: boolean;
  addressComplete: boolean;
  idComplete: boolean;
  emergencyContactComplete: boolean;
  intakeComplete: boolean;
  hasPhone: boolean;
  hasDob: boolean;
  selectedPharmacy: boolean;
  pcpPreference: boolean;
  therapistPreference: boolean;
}

export interface CreateThreadParams {
  threadType: string;
  content: string;
}

// Messaging
export interface Inbox {
  threads: Array<Thread>;
  hasUnreadMessages: boolean;
}

export interface Message {
  id: string;
  content: string;
  timestamp: number;
  inbound: boolean;
  sender: {
    // id: string;
    displayName: string;
  };
}
export interface Thread {
  id: string;
  subject: string;
  messages: Array<Message>;
  unreadMessages: number;
  lastMessageTime: number;
  title?: string;
  messagePreview?: string;
  patientId?: string;
}

export interface SendMessageResponse {
  id: string | number;
}

export interface NoteTemplate {
  id: string;
  name: string;
  value: string;
}

export interface PatientReferral {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  providerName: string;
  providerEmail?: string;
  providerPhone?: string;
}

export type CreateTemplateParams = Omit<NoteTemplate, "id">;

export type DiscountCode = "50OFF" | "APRIL2021" | "FIRSTMO5";

export interface Pharmacy {
  id: string;
  pharmNcpdpId: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  distance: number;
}

export interface ProgressPoint {
  timestamp: number;
  value: number;
}

export interface ProgressChart {
  minScore: number;
  maxScore: number;
  history: Array<ProgressPoint>;
}
