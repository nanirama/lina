import { Model } from "objection";
import Address from "./address";
import { BaseModel } from "./base";
import { Patient } from "./patient";
import { Provider } from "./provider";
import { UserReferrer } from "./user_referrer";

export enum AccountType {
  PATIENT = "PATIENT",
  PROVIDER = "PROVIDER",
  ADMIN = "ADMIN",
  SUPERUSER = "SUPERUSER",
}
/**
 * Represents a user on our system. A user can be
 * an admin, a provider, or a patient. Provider and Patient have their
 * own respective models as well (see this folder). This model
 * only contains items that are common to all user types.
 */
export class User extends BaseModel {
  id!: number;
  accountType!: AccountType;
  firstName!: string;
  lastName!: string;
  birthdate!: Date;
  phone!: string;
  email!: string;
  password!: string;
  verifiedEmail!: boolean;
  verifiedPhone!: boolean;
  disabled!: boolean;
  timezone!: string;

  address?: Address;
  patient?: Patient;
  provider?: Provider;
  referrer?: UserReferrer;

  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        accountType: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        birthdate: { type: "date" },
        phone: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        addressId: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    return {
      address: {
        relation: Model.HasOneRelation,
        modelClass: Address,
        join: {
          from: "addresses.userId",
          to: "users.id",
        },
      },
      patient: {
        relation: Model.HasOneRelation,
        modelClass: Patient,
        join: {
          from: "users.id",
          to: "patients.userId",
        },
      },
      provider: {
        relation: Model.HasOneRelation,
        modelClass: Provider,
        join: {
          from: "users.id",
          to: "providers.userId",
        },
      },
      referrer: {
        relation: Model.HasOneRelation,
        modelClass: UserReferrer,
        join: {
          from: "users.id",
          to: "user_referrers.userId",
        },
      },
    };
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
