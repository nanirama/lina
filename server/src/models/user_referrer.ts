import { PartialModelObject } from "objection";
import { BaseModel } from "./base";

/**
 * Used to represent a set of UTM parameters for a user signup.
 * This is stored in app context on the frontend before signup,
 * and passed along with other user information during registration.
 */
export class UserReferrer extends BaseModel {
  id!: number;
  userId!: number;
  rawUrl!: string;
  utmSource!: string;
  utmMedium!: string;
  utmCampaign!: string;
  utmContent!: string;
  utmTerm!: string;

  static get tableName() {
    return "user_referrers";
  }
}

export type UserReferrerType = PartialModelObject<UserReferrer>;
