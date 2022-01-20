/**
 * All API calls used in the provider app
 */
import {
  ProviderAppointment,
  PatientChart,
  PatientInfo,
  ProviderSlot,
  UpdatePsychotherapyNoteRequest,
  AppointmentStatus,
  AppointmentChecklist,
  NoteData,
  EmergencyContactType,
  Address,
  Thread,
  Inbox,
  AllergyType,
  MedicationType,
  NoteTemplate,
  CreateTemplateParams,
} from "@healthgent/server/src/lib/api_types";
import { addMinutes } from "date-fns";
import Cookies from "js-cookie";

const getUrl = (endpoint: string) => {
  const baseUrl =
    localStorage.getItem("base_url") || process.env.NEXT_PUBLIC_HG_BASE_API_URL;
  return `${baseUrl}${endpoint}`;
};

const AUTH_TOKEN_KEY = "auth_token";

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
    throw json.error || response.statusText;
  }
  return json as Promise<T>;
};

const get = async <T>(url: string): Promise<T> =>
  await apiFetch("GET", url, undefined);

const post = async <T>(url: string, request: Object): Promise<T> =>
  await apiFetch("POST", url, request);

const put = async <T>(url: string, request: Object): Promise<T> =>
  await apiFetch("PUT", url, request);

export const login = async (email: string, password: string) =>
  await post<{ token: string }>("/api/login", {
    email,
    password,
  }).then((res) => res.token);

export const getAppointments = async () =>
  await get<{ appointments: Array<ProviderAppointment> }>(
    "/api/provider/appointments"
  ).then((res) => res.appointments);

export const getPatients = async () =>
  await get<{ patients: Array<PatientInfo> }>("/api/provider/patients").then(
    (res) => res.patients
  );

export const getAvailability = async () =>
  await get<{ slots: Array<ProviderSlot> }>("/api/provider/availability").then(
    (res) => res.slots
  );

export const markAvailability = async (
  dates: Array<Date>,
  slotLength: number
) => {
  const slots = dates.map((d) => ({
    // TODO(sbb): hack
    // @ts-ignore
    date: d.toLocaleDateString("default").replaceAll("/", "-"),
    slotStart: d,
    slotEnd: addMinutes(d, slotLength),
  }));
  return await post("/api/provider/availability", { slots });
};

export const getSlotInfo = async (slotId: string) =>
  await get(`/api/provider/slots/${slotId}`);

export const removeAvailability = async (slotId: string) =>
  await post(`/api/provider/remove_availability/${slotId}`, { slotId });

export const getPatientChart = async (patientId: string) =>
  await get<PatientChart>(`/api/provider/patient/${patientId}/chart`);

export const getPatientInfo = async (patientId: string) =>
  await get<{
    emergencyContact: EmergencyContactType;
    address: Address;
  }>(`/api/provider/patient/${patientId}/info`);

export const createNote = async (
  patientId: string,
  data: NoteData,
  appointmentId?: string
) =>
  await post("/api/provider/notes/create", {
    data,
    patientId,
    appointmentId,
  });

export const updateNote = async (
  noteId: string,
  data: NoteData,
  lock?: boolean
) =>
  await post<{ success: boolean }>(`/api/provider/notes/${noteId}`, {
    data,
    lock,
  });

export const updateAppointment = async (
  appointmentId: string,
  req: {
    status?: AppointmentStatus;
    billingCode?: string;
    checklist?: AppointmentChecklist;
  }
) => await post(`/api/provider/appointment/${appointmentId}`, req);

export const updatePsychotherapyNote = async (
  req: UpdatePsychotherapyNoteRequest
) => await post(`/api/provider/psych_notes/${req.appointmentId}`, req);

export const getAppointment = async (appointmentId: string) =>
  await get<{ appointment: ProviderAppointment }>(
    `/api/provider/appointment/${appointmentId}`
  ).then((r) => r.appointment);

export const scheduleAppointment = async (
  patientId: string,
  date: string,
  time: string,
  appointmentLength: number
) =>
  await post("/api/provider/appointments/create", {
    patientId,
    date,
    time,
  });

export const getAllergies = async (patientId: string) => {
  return await get<{ allergies: Array<AllergyType> }>(
    `/api/provider/patient/${patientId}/allergies`
  ).then((r) => r.allergies);
};
export const updateAllergy = async (
  patientId: string,
  allergyId: number,
  allergy: AllergyType
) => {
  return await put(
    `/api/provider/patient/${patientId}/allergies/${allergyId}`,
    {
      ...allergy,
    }
  );
};

export const addAllergy = async (patientId: string, allergy: AllergyType) => {
  return await post(`/api/provider/patient/${patientId}/allergies`, allergy);
};

export const getMedications = async (patientId: string) => {
  return await get<{ medications: Array<MedicationType> }>(
    `/api/provider/patient/${patientId}/medications`
  ).then((r) => r.medications);
};
export const updateMedication = async (
  patientId: string,
  medicationId: number,
  medication: MedicationType
) => {
  return await put(
    `/api/provider/patient/${patientId}/medications/${medicationId}`,
    {
      ...medication,
    }
  );
};
export const addMedication = async (
  patientId: string,
  medication: MedicationType
) => {
  return await post(
    `/api/provider/patient/${patientId}/medications`,
    medication
  );
};

export const updatePatientEmail = async (patientId: string, email: string) =>
  await post(`/api/admin/patient/${patientId}/update_email`, { email });

export const updatePatientAddress = async (
  patientId: string,
  address: Address
) =>
  await post(`/api/admin/patient/${patientId}/update_address`, {
    ...address,
  });

export const updatePatientPhone = async (patientId: string, phone: string) =>
  await post(`/api/admin/patient/${patientId}/update_phone`, { phone });

export const updatePatientEmergencyContact = async (
  patientId: string,
  emergencyContact: Partial<EmergencyContactType>
) =>
  await post<{ success: boolean }>(
    `/api/admin/patient/${patientId}/emergency_contact`,
    emergencyContact
  );

export const getThread = (threadId: string) =>
  get<Thread>(`/api/thread/${threadId}`);

export const postMessage = (threadId: string, content: string) =>
  post(`/api/thread/${threadId}`, { content });

export const getInbox = () => get<Inbox>("/api/messages");

export const getUnreadMessageCount = async () => {
  return get<{ unreadMessages: number }>("/api/messages/unread").then(
    (r) => r.unreadMessages
  );
};

export const getProfile = () =>
  get<{
    address: Address;
    email: string;
    phone: string;
    canPrescribe: boolean;
    slotLength: number;
  }>("/api/provider/me");

export const updateEmail = async (email: string) => {
  return await post("/api/provider/update_email", { email });
};

export const updatePhone = async (phone: string) => {
  return await post("/api/provider/update_phone", { phone });
};

export const updatePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  return await post("/api/provider/update_password", {
    currentPassword,
    newPassword,
  });
};

export const treatLogin = async (authCode: string) => {
  return await post("/api/provider/treat_auth", { authCode });
};

export const getTreatToken = async () => {
  return await get<{ authToken: string }>("/api/provider/treat_token").then(
    (r) => r.authToken
  );
};

export const getTemplates = async () => {
  return await get<{ results: Array<NoteTemplate> }>(
    "/api/provider/templates"
  ).then((r) => r.results);
};

export const createTemplate = async (params: CreateTemplateParams) => {
  return await post<{ id: string }>(`/api/provider/templates`, params).then(
    (r) => r.id
  );
};

export const updateTemplate = async (
  templateId: string,
  params: CreateTemplateParams
) => {
  return await put(`/api/provider/templates/${templateId}`, params);
};

export const forgotPassword = async (email: string) => {
  return await post("/api/forgot_password", { email });
};

export const resetPassword = async (token: string, password: string) => {
  return await post("/api/reset_password", { token, password });
};
