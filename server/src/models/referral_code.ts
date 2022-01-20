import { BaseModel } from "./base";

/**
 * Used to represent a referral code for a patient
 * referring another patient.
 * TODO: eventually link this to billing when patient
 * referrals actually happen.
 */
export class ReferralCode extends BaseModel {
  id!: number;
  email!: string;
  code!: string;
  name!: string;
  campaign!: string;

  static get tableName() {
    return "referral_codes";
  }
}
