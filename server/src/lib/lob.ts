/**
 * API used for address verification.
 */
// @ts-ignore
import Lob from "lob";
import logger from "../config/logger";

interface Address {
  streetAddress: string;
  unitNumber?: string;
  city: string;
  state: string;
  zip: string;
}

const apiClient = Lob(process.env.LOB_API_KEY);

export const verifyAddress = (address: Address): Promise<Address> => {
  const {
    streetAddress: primary_line,
    unitNumber: secondary_line,
    city,
    state,
    zip: zip_code,
  } = address;
  return apiClient.usVerifications
    .verify({ primary_line, secondary_line, city, state, zip_code })
    .then((res: any, err: any) => {
      if (err) {
        logger.warn(`Error from the Lob API: ${err}`);
        return address;
      }
      const streetAddress = res.primary_line;
      const unitNumber = res.secondary_line;
      const city = res.components.city;
      const state = res.components.state;
      const zip = res.components.zip_code;
      return {
        streetAddress,
        unitNumber,
        city,
        state,
        zip,
      };
    });
};
