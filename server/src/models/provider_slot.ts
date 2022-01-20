import { Model } from "objection";
import { Appointment } from "./appointment";
import { BaseModel } from "./base";
import { Provider } from "./provider";

/**
 * Represents a single available time slot for a provider,
 * e.g. availability at 9:00am on 10/11/21 for 30 minutes.
 * When a slot is taken, there will be an associated appointment
 * object.
 */
export class ProviderSlot extends BaseModel {
  id!: string;
  providerId!: string;
  // We have date as a separate field since it makes querying for
  // available appointments on a specific date easier (no TZ conversion)
  // needed
  slotDate!: Date;
  // timestamp for slot start
  slotStart!: Date;
  // timestamp for slot end
  slotEnd!: Date;
  // whether the appointment is taken
  taken!: boolean;

  provider!: Provider;
  appointment?: Appointment;

  static get tableName() {
    return "providerSlots";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["providerId", "slotDate", "slotStart", "slotEnd"],
      properties: {
        id: { type: "string" },
        providerId: { type: "uuid" },
        slotDate: { type: "date" },
        slotStart: { type: "date" },
        slotEnd: { type: "date" },
        taken: { type: "bool" },
      },
    };
  }

  static get relationMappings() {
    return {
      provider: {
        relation: Model.BelongsToOneRelation,
        modelClass: Provider,
        join: {
          from: "providerSlots.providerId",
          to: "providers.id",
        },
      },
      appointment: {
        relation: Model.HasOneRelation,
        modelClass: Appointment,
        join: {
          from: "providerSlots.id",
          to: "appointments.providerSlotId",
        },
      },
    };
  }
}
