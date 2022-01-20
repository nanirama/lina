import { BaseModel } from "./base";

/**
 * Model that represents one entry on our waitlist.
 * Used when a user signs up from a state that
 * Lina does not support yet.
 */
export class WaitlistEmail extends BaseModel {
  id!: number;
  email!: string;
  state!: string;

  static get tableName() {
    return "waitlist_emails";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string" },
        state: { type: "string" },
      },
    };
  }
}
