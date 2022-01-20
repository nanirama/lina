/**
 * Typescript types for Treat API
 */
export type GrantType = "CREDENTIALS" | "AUTH_CODE" | "REFRESH_TOKEN";

export interface TreatOAuthResponse {
  grantType: GrantType;
  accessToken: {
    tokenString: string;
    expiresOn: string;
  };
}

export interface TreatAuthCodeResponse extends TreatOAuthResponse {
  refreshToken: {
    tokenString: string;
    expiresOn: string;
  };
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface CreateOrUpdateUserParams {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  mobileNumber: string;
  email: string;
  mrn: string;
  pharmacyId?: string;
  activeFlag?: boolean;
}

export interface CreateEncounterParams {
  treatUid: string;
  appointmentId: string;
  appointmentDate: Date;
}

export interface EncountersResponse {
  encounters: Array<{ uid: number }>;
}

export interface RxOrder {
  uid: number;
  //   ordStatus: "PRINTED";
  ordStatus: string;
  //   ordDrugCode: "024234";
  ordDrugCode: string;
  //   ordDrugCodeSystem: "Medispan";
  ordDrugCodeSystem: string;
  //   ordDrugName: "Zoloft 50MG PO Tablet";
  ordDrugName: string;
  // number of pills/tablets
  ordQty: number;
  //   ordDosage: "TABS";
  ordDosage: string;
  ordFreq: string;
  // duration is in days
  ordDuration: number;
  //   e.x. "1 Tablet, Daily for 30 days";
  ordSig: string;
  //   ordDispAmt: "30 Tablets";
  ordDispAmt: string;
  //   ordDispUnits: "Tablets";
  ordDispUnits: string;
  ordNotes: string;
  ordRefills: number;
  ordSubstitutionAllowed: boolean;
  encounterId: number;
  createdAt: string;
  updatedAt: string;
}

export interface RxOrdersResponse {
  orders: Array<RxOrder>;
}

export interface FindPharmacyParameters {
  zip?: string;
  locationLat?: number;
  locationLon?: number;
}

export interface Pharmacy {
  id: number;
  distance: string;
  pharmNcpdpId: string;
  pharmStoreNumber?: string;
  pharmStoreName: string;
  pharmAddressLine1: string;
  pharmAddressLine2?: string;
  pharmCity: string;
  pharmState: string;
  pharmZip: string;
  pharmCrossStreet?: string;
  pharmPhone: string;
  pharmFax?: string;
  pharmEmail?: string;
  pharmNpi: string;
  pharmIsErxEnabed: boolean;
  pharmIsEpcsEnabled: boolean;
  pharmIsRetailStore: boolean;
  pharmIs24Hrs: boolean;
  pharmIsMailOrder: boolean;
  pharmIsSpeciality: boolean;
  pharmIsLTC: boolean;
  pharmLatitude: number;
  pharmLongitude: number;
  pharmPreciseCoords: boolean;
  pharmActiveStart: string;
  pharmActiveEnd: string;
  pharmLastModified: string;
  createdAt: string;
  updatedAt: string;
}
