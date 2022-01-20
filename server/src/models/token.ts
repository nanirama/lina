import { BaseModel } from "./base";

export type TokenType =
  | "reset_password"
  | "email_confirmation"
  | "otp"
  | "magic_link";

/**
 * A generic token class that can represent several
 * types of tokens used throughout the app, including:
 * - Reset Password
 * - Email Confirmation
 * - OTP Login
 * - Magic Link
 * Not all of these are actively used, but this was written
 * to support multiple use cases to reduce boilerplate.
 */
export class Token extends BaseModel {
  id!: number;
  userId!: number;
  used!: boolean;
  expiration!: Date;
  tokenType!: TokenType;
  value!: string;
  redirectPath?: string;

  static get tableName() {
    return "tokens";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "string" },
        userId: { type: "number" },
        used: { type: "boolean" },
        value: { type: "string" },
        tokenType: { type: "string" },
      },
    };
  }
}
