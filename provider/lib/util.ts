/** Simple utilities used throughout provider frontend */
import { Address } from "@healthgent/server/src/lib/api_types";
import differenceInYears from "date-fns/differenceInYears";

export const formatPhoneNumber = (phone: string) =>
  phone.replace(/\D+/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

export const formatAddress = (address: Address) => {
  const streetAddress = address.unitNumber
    ? `${address.streetAddress} ${address.unitNumber}`
    : address.streetAddress;
  return `${streetAddress}, ${address.city} ${address.state} ${address.zip}`;
};

/** Returns a link for 1 click access to the e-prescribe system */
export const getPrescribeUrl = (jwt: string) => {
  return `${process.env.NEXT_PUBLIC_TREAT_BASE_URL}/#!/app/patient-encounter/select-patient?next=TREAT&embed=1&jwt=${jwt}`;
};

export const getFormattedBirthdate = (birthdate: string) => {
  const date = new Date(birthdate)
  return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()} (${differenceInYears(new Date(), date)} yo)`;
}
