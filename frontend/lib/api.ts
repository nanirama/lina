/**
 * All API calls utilized by the patient facing product.
 */
import {
  Address,
  Appointment,
  AvailabilityResponse,
  Thread,
  UserProfile,
  UserRegistration,
  IntakeEvaluationResponse,
  OnboardingStatus,
  Inbox,
  QuestionResponse,
  CreateThreadParams,
  PatientReferral,
  Prescription,
  Pharmacy,
  ProgressChart,
} from "@healthgent/server/src/lib/api_types";
import Cookies from "js-cookie";
import { USState } from "../../server/src/utils/states";
import {normalizeDateToUTC} from "./util";

const getUrl = (endpoint: string) => {
  if (window.location.href.indexOf("https://hgstaging.ngrok.io") > -1) {
    return `https://hgapi.ngrok.io${endpoint}`;
  }
  const baseUrl =
    localStorage.getItem("base_url") || process.env.NEXT_PUBLIC_HG_BASE_API_URL;
  return `${baseUrl}${endpoint}`;
};

const AUTH_TOKEN_KEY = "auth_token";

class ApiError extends Error {
  statusCode!: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const apiFetch = async <T>(
  method: string,
  url: string,
  body?: Object
): Promise<T> => {
  const token = Cookies.get(AUTH_TOKEN_KEY);
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(getUrl(url), {
    headers,
    method,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await response.json();
  if (!response.ok) {
    throw new ApiError(json.error || response.statusText, response.status);
  }
  return json as Promise<T>;
};

const fileUpload = async <T>(url: string, body: FormData): Promise<T> => {
  const token = Cookies.get(AUTH_TOKEN_KEY);
  const headers = { Authorization: `Bearer ${token}` };
  const method = "POST";

  return fetch(getUrl(url), {
    headers,
    method,
    body,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
};

const get = async <T>(
  endpoint: string,
  params?: Record<string, unknown>
): Promise<T> => {
  // @ts-ignore
  const paramString = new URLSearchParams(params).toString();
  const url = paramString.length > 0 ? `${endpoint}?${paramString}` : endpoint;
  return await apiFetch("GET", url, undefined);
};

const post = async <T>(url: string, request: Object): Promise<T> => {
  return await apiFetch("POST", url, request);
};

export const getStates = async () => {
  return await get<{ states: Array<USState> }>("/api/states")
    .then((r) => r.states)
    .then((states) => states.sort((a, b) => a.name.localeCompare(b.name)));
};

export const register = async (
  registration: UserRegistration
): Promise<string> => {
  const { consent, ...body } = registration;
  return await post<{ token: string }>("/api/signup", registration).then(
    (r) => r.token
  );
};

export const submitQuiz = async (quiz: Array<QuestionResponse>) => {
  return await post<{ id: string }>("/api/submit_quiz", {
    answers: quiz,
  }).then((r) => r.id);
};

export const submitCheckin = async (responses: Array<QuestionResponse>) => {
  return await post("/api/patient/submit_checkin", { responses });
};

export const getProgressHistory = async (historyType: string) => {
  return await get<ProgressChart>("/api/patient/progress_history", {
    historyType,
  });
};

export const checkState = async (state: string) => {
  return await post<{ available: boolean }>("/api/patient/check_state", {
    state,
  }).then((r) => r.available);
};

export const checkZip = async (zip: string) => {
  return await get<{ available: boolean }>("/api/check_zip", {
    zip,
  }).then((r) => r.available);
};

export const joinWaitlist = async (email: string, state: string) => {
  return await post("/api/join_waitlist", { email, state });
};

export const getAvailability = async () => {
  return await get<AvailabilityResponse>("/api/patient/availability");
};

export const getStripeClientSecret = async (promotionCode?: string) => {
  return await get<{ clientSecret: string }>("/api/patient/payment_setup", {
    promotionCode,
  }).then((r) => r.clientSecret);
};

export const confirmPayment = async (paymentIntentId: string) => {
  return await post("/api/patient/confirm_payment", {
    paymentIntentId,
  });
};

export const updatePaymentMethod = async (paymentMethodId: string) => {
  return await post("/api/patient/update_payment_method", { paymentMethodId });
};

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  return await post<{ token: string }>("/api/login", { email, password }).then(
    (r) => r.token
  );
};

export const superuser = async (password: string): Promise<string> => {
  return await post<{ token: string }>("/api/superuser", { password }).then(
    (r) => r.token
  );
};

export const loginAs = async (email: string): Promise<string> => {
  return await post<{ token: string }>("/api/login_as", { email }).then(
    (r) => r.token
  );
};

export const bookAppointment = async (slotId: string) => {
  return await post("/api/patient/schedule_appointment", {
    slotId,
  });
};

export const getUpcomingAppointment = async () => {
  return await get<{ appointment?: Appointment }>(
    "/api/patient/upcoming_appointment"
  );
};

export const getPreviousAppointments = async () => {
  return await get<{ previousAppointments: Array<Appointment> }>(
    "/api/patient/previous_appointments"
  ).then((r) => r.previousAppointments);
};

export const getProfile = async () => {
  return await get<UserProfile>("/api/patient/me");
};

export const updateEmail = async (email: string) => {
  return await post("/api/patient/update_email", { email });
};

export const updateAddress = async (address: Address, isOnboarding = false) => {
  return await post("/api/patient/update_address", {
    ...address,
    isOnboarding,
  });
};

export const updatePhone = async (phone: string) => {
  return await post("/api/patient/update_phone", { phone });
};

export const updateDob = async (date: Date) => {
  return await post("/api/patient/update_birthdate", {
    birthdate: normalizeDateToUTC(date),
  });
};

export const updateEmergencyContact = async (
  params: Record<string, unknown>
) => {
  return await post<{ success: boolean }>(
    "/api/patient/emergency_contact",
    params
  );
};

export const forgotPassword = async (email: string) => {
  return await post("/api/forgot_password", { email });
};

export const resetPassword = async (token: string, password: string) => {
  return await post("/api/reset_password", { token, password });
};

export const checkIntake = async (intakeId: string) => {
  return await get<IntakeEvaluationResponse>(
    `/api/check_intake?id=${intakeId}`
  );
};

export const getOnboardingStatus = async () => {
  return await get<OnboardingStatus>("/api/patient/status");
};

export const verifyId = async (inquiryId: string) => {
  return await post("/api/patient/verify_id", { inquiryId });
};

export const createNewThread = async (params: CreateThreadParams) => {
  return await post("/api/create_thread", params);
};

export const getThread = async (threadId: string) => {
  return get<Thread>(`/api/thread/${threadId}`);
};

export const postMessage = async (threadId: string, content: string) => {
  return post(`/api/thread/${threadId}`, { content });
};

export const getInbox = async () => {
  return get<Inbox>("/api/messages");
};

export const getUnreadMessageCount = async () => {
  return get<{ unreadMessages: number }>("/api/messages/unread").then(
    (r) => r.unreadMessages
  );
};

export const submitMedicalIntake = async (answers: Object) => {
  return await post<{ id: string }>("/api/patient/update_intake", { answers });
};

export const submitReferral = async (referral: PatientReferral) => {
  return await post("/api/refer_patient", referral);
};

export const getReferralCode = async (name: string, email: string) => {
  return await post<{ code: string }>("/api/referral_code", {
    name,
    email,
  }).then((r) => r.code);
};

export const submitStartIntake = async (params: {
  email?: string;
  phone: string;
  firstName: string;
  lastName: string;
  intakeId: string;
}) => {
  return await post("/api/start_intake", params);
};

export const getPrescriptions = async () => {
  return await get<{ prescriptions: Array<Prescription> }>(
    "/api/patient/prescriptions"
  ).then((r) => r.prescriptions);
};

export const getVideoToken = async (identity: string) => {
  return await get<{ token: string }>("/api/video/token", { identity }).then(
    (r) => r.token
  );
};

export const getPharmacies = async (params: {
  zip?: string;
  lat?: number;
  lon?: number;
}) => {
  return await get<{ pharmacies: Array<Pharmacy> }>(
    "/api/patient/pharmacies",
    params
  ).then((r) => r.pharmacies);
};

export const setPharmacy = async (pharmacyId: string) => {
  return await post("/api/patient/pharmacy", { pharmacyId });
};

export const getPharmacy = async () => {
  return await get<Pharmacy>("/api/patient/pharmacy");
};

export const addPrimaryCarePhysicianInfo = async (
  name: string,
  phone: string,
  email: string,
  allowSharing: boolean
) => {
  return await post("/api/patient/update_pcp", {
    name,
    phone,
    email,
    allowSharing,
  });
};

export const addExternalTherapistInfo = async (
  name: string,
  phone: string,
  email: string,
  allowSharing: boolean
) => {
  return await post("/api/patient/update_therapist", {
    name,
    phone,
    email,
    allowSharing,
  });
};

export const markOnboardingComplete = async () => {
  return await post("/api/patient/onboarding_complete", {});
};
