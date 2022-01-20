import { BaseModel } from "./base";

/**
 * Password reset token. This should be merged with the Token
 * model (see token.ts) at some point.
 */
export class ResetToken extends BaseModel {
  id!: number;
  userId!: number;
  used!: boolean;
  expiration!: Date;
  token!: string;

  static get tableName() {
    return "reset_tokens";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "string" },
        userId: { type: "number" },
        used: { type: "boolean" },
        token: { type: "string" },
      },
    };
  }
}
