import { ReferralCode } from "../models/referral_code";
import { generateRandomNumericalString } from "../utils/random";

/**
 * Used for patient-to-patient referrals
 * @param name the name of the person referring
 * @returns first name with a randomly generated numerical suffix
 */
const generateCode = (name: string) => {
  return name.split(" ")[0].toLowerCase() + generateRandomNumericalString(4);
};

/**
 *
 * @param email email for the referring person
 * @param name first name for the referring person
 * @param campaign unused.
 * @returns a referral code that can be used when signing up
 */
export const createReferralCode = async (
  email: string,
  name: string,
  campaign?: string
) => {
  const refcode = await ReferralCode.query().where({ email }).first();
  if (refcode) {
    return refcode;
  }
  const code = generateCode(name);
  return await ReferralCode.query().insertAndFetch({
    email,
    name,
    code,
    campaign,
  });
};
