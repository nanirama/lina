import { Model } from "objection";
import { BaseModel } from "./base";
import { User } from "./user";

/**
 * Represents a street address in the US. Used
 * primarily for patient mailing addresses, but can be
 * used for other user types as well.
 */
class Address extends BaseModel {
  id!: number;
  userId!: number;
  streetAddress!: string;
  unitNumber!: string;
  city!: string;
  state!: string;
  zip!: string;

  user!: User;

  static get tableName() {
    return "addresses";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "streetAddress", "city", "state", "zip"],
      properties: {
        id: { type: "integer" },
        streetAddress: { type: "string", minLength: 1, maxLength: 255 },
        unitNumber: { type: "string", maxLength: 255 },
        city: { type: "string", minLength: 1, maxLength: 255 },
        state: { type: "string", minLength: 1, maxLength: 255 },
        zip: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "addresses.userId",
          to: "users.id",
        },
      },
    };
  }
}

export default Address;
