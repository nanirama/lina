/**
 * ePrescribe system API. Please see Bravado Health's website for API documentation.
 */
import { result } from "lodash";
import fetch from "node-fetch";
import {
  TreatAuthCodeResponse,
  TreatOAuthResponse,
  CreateOrUpdateUserParams,
  CreateEncounterParams,
  EncountersResponse,
  RxOrder,
  GrantType,
  RxOrdersResponse,
  Pharmacy,
  FindPharmacyParameters,
} from "./types";

const TREAT_CLIENT_ID = process.env.TREAT_CLIENT_ID;
const TREAT_CLIENT_SECRET = process.env.TREAT_CLIENT_SECRET;

const TREAT_BASE_URL = process.env.TREAT_BASE_URL;

export const MAIL_ORDER_PHARMACY_ID = 2706488;

const getTreatUrl = (endpoint: string) => {
  return `${TREAT_BASE_URL}${endpoint}`;
};

const treatFetch = async <T>(
  method: "POST" | "GET" | "PUT",
  endpoint: string,
  token?: string,
  body?: Record<string, unknown>
): Promise<T> => {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(getTreatUrl(endpoint), {
    headers,
    method,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await response.json();
  if (!response.ok) {
    throw json?.error || `${response.statusText} ${JSON.stringify(json)}`;
  }
  return json as Promise<T>;
};

const post = async <T>(endpoint: string, body: any) => {
  return await treatFetch<T>("POST", endpoint, undefined, body);
};

const authenticatedGet = async <T>(
  endpoint: string,
  params: Record<string, unknown> = {}
) => {
  const { tokenString } = await getAppToken();
  // @ts-ignore
  const paramString = new URLSearchParams(params).toString();
  const url = paramString.length > 0 ? `${endpoint}?${paramString}` : endpoint;
  return await treatFetch<T>("GET", url, tokenString);
};

const authenticatedPost = async <T>(endpoint: string, body: any) => {
  const { tokenString } = await getAppToken();
  return await treatFetch<T>("POST", endpoint, tokenString, body);
};

const authenticatedPut = async <T>(endpoint: string, body: any) => {
  const { tokenString } = await getAppToken();
  return await treatFetch<T>("PUT", endpoint, tokenString, body);
};

const getTreatOAuthParams = (grantType: GrantType) => {
  return {
    grantType,
    clientId: TREAT_CLIENT_ID,
    clientSecret: TREAT_CLIENT_SECRET,
  };
};

export const getAppToken = async () => {
  const params = getTreatOAuthParams("CREDENTIALS");
  const response = await post<TreatAuthCodeResponse>("/oauth/token", params);
  return response.accessToken;
};

export const getRefreshTokenFromAuthCode = async (authCode: string) => {
  const params = getTreatOAuthParams("AUTH_CODE");
  const request = { ...params, authCode };
  const response = await post<TreatAuthCodeResponse>("/oauth/token", request);
  return {
    refreshToken: response.refreshToken.tokenString,
    authToken: response.accessToken.tokenString,
  };
};

export const getJwt = async (refreshToken: string) => {
  const params = getTreatOAuthParams("REFRESH_TOKEN");
  const request = { ...params, refreshToken };
  const response = await post<TreatOAuthResponse>("/oauth/token", request);
  return {
    authToken: response.accessToken.tokenString,
  };
};

export const createPatient = async (params: CreateOrUpdateUserParams) => {
  const result = await authenticatedPost<{ uid: number }>("/v1/patients", {
    ...params,
    mrn: params.mrn.slice(0, 10),
    activeFlag: true,
  });
  await authenticatedPut(`/v1/patients/${result.uid}`, {
    ...params,
    pharmacyId: params.pharmacyId || "MAIL_ORDER_PHARMACY_ID",
    activeFlag: true,
  });
  return result;
};

export const updatePatient = async (
  treatUid: string,
  params: CreateOrUpdateUserParams
) => {
  await authenticatedPut(`/v1/patients/${treatUid}`, params);
  return result;
};

export const createEncounter = async (params: CreateEncounterParams) => {
  return await authenticatedPost<{ uid: number }>("/v1/encounters", {
    patientId: params.treatUid,
    encReference: params.appointmentId,
    encStartDate: params.appointmentDate.toISOString(),
    encDischargeDisp: "01",
    encStatus: "PROCESSED",
    // pharmaNcpdpid: "2706488",
  }).then((r) => `${r.uid}`);
};

export const getEncounterIdsForPatient = async (treatUid: string) => {
  return await authenticatedGet<EncountersResponse>("/v1/encounters", {
    responseType: "IDONLY",
    includeClosed: true,
    patientUid: treatUid,
  }).then((r) => r.encounters.map((e) => e.uid));
};

export const getRxOrderForEncounter = async (encUid: number) => {
  return await authenticatedGet<RxOrdersResponse>("/v1/rxorders", {
    encUid,
  }).then((r) => r.orders);
};

export const getRxOrdersForPatient = async (treatUid: string) => {
  const encounterIds = await getEncounterIdsForPatient(treatUid);
  const rxOrders = await Promise.all(
    encounterIds.map((encUid) => getRxOrderForEncounter(encUid))
  ).then((orders) => orders.flat());

  const latestOrders: Record<string, RxOrder> = {};
  rxOrders.forEach((order) => {
    const key = order.ordDrugCode;
    if (
      latestOrders[key] === undefined ||
      new Date(latestOrders[key].createdAt) < new Date(order.createdAt)
    ) {
      latestOrders[key] = order;
    }
  });
  return Object.values(latestOrders);
};

export const findPharmacies = async (params: FindPharmacyParameters) => {
  return await authenticatedGet<{ pharmacies: Array<Pharmacy> }>(
    "/v1/pharmacies/locate",
    { ...params }
  ).then((r) => r.pharmacies);
};

export const updatePatientPharmacy = async (
  treatUid: string,
  pharmaNcpdpid: string
) => {
  return await authenticatedPut(`/v1/patients/${treatUid}`, {
    pharmaNcpdpid,
  });
};

const searchPharmacy = async (
  pharmNcpdpId: string
): Promise<Pharmacy | undefined> => {
  const pharmacies = await authenticatedGet<{ pharmacies: Array<Pharmacy> }>(
    "/v1/pharmacies",
    { erxEnabled: true, ncpdpId: pharmNcpdpId }
  ).then((response) => response.pharmacies);
  if (pharmacies.length > 0) {
    return pharmacies[0];
  }
};

export const getPharmacyInfo = async (treatPharmacyId: string) => {
  // Note: The /v1/pharmacies endpoint wants the treat pharmacy ID, while the
  // patient preference setting wants "pharmNcpdpId".
  // {
  //  id: 52111,
  //  pharmNcpdpId: '4514077',
  // }
  return await searchPharmacy(treatPharmacyId);
  // return await authenticatedGet<Pharmacy>(`/v1/pharmacies/${treatPharmacyId}`);
};
