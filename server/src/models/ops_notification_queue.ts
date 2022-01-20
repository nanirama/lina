import { BaseModel } from "./base";

export enum NotificationTypes {
  PROVIDER_AVAILABILITY = "provider-availability",
  PATIENT_PROVIDER_CHANGE="patient-provider-change"
}
/**
 * Model that represents one entry on our waitlist.
 * Used when a user signs up from a state that
 * Lina does not support yet.
 */
export class OpsNotification extends BaseModel {
  id!: number;
  message!: string;
  type!: NotificationTypes;
  sent?: boolean;
  sent_at?: Date;

  static get tableName() {
    return "ops_notification_queue";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "number" },
        message: { type: "string" },
        type: { type: "string" },
        sent: { type: "boolean" },
        sent_at: { type: "date" },
      },
    };
  }
}