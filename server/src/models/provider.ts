import { Model } from "objection";
import { Appointment } from "./appointment";
import { BaseModel } from "./base";
import { NoteTemplate } from "./note_template";
import { ProviderLicense } from "./provider_license";
import { ProviderSlot } from "./provider_slot";
import { User } from "./user";

/**
 * JC = Jackson and Coker
 * Green Bell = directly employed by the Lina affiliated
 * physician corporation
 */
export type EmployeeType = "GREEN_BELL" | "JC" | "RELODE";

/**
 * Represents a provider on the platform.
 */
export class Provider extends BaseModel {
  id!: string;
  title!: string;
  // NOTE: this is deprecated
  doxyLink!: string;
  userId!: number;
  // OAuth token for ePrescribe
  treatRefreshToken!: string;
  // bio shown during provider selection
  bio!: string;
  // TODO: change this to something dynamically uploaded
  publicPicPath!: string;
  employeeType!: EmployeeType;

  user!: User;
  licenses!: Array<ProviderLicense>;

  static get tableName() {
    return "providers";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId"],
      properties: {
        id: { type: "uuid" },
        userId: { type: "integer" },
        title: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "providers.userId",
          to: "users.id",
        },
      },
      slots: {
        relation: Model.HasManyRelation,
        modelClass: ProviderSlot,
        join: {
          from: "providers.id",
          to: "providerSlots.providerId",
        },
      },
      appointments: {
        relation: Model.HasManyRelation,
        modelClass: Appointment,
        join: {
          from: "providers.id",
          to: "appointments.providerId",
        },
      },

      noteTemplates: {
        relation: Model.HasManyRelation,
        modelClass: NoteTemplate,
        join: {
          from: "providers.id",
          to: "noteTemplates.providerId",
        },
      },

      licenses: {
        relation: Model.HasManyRelation,
        modelClass: ProviderLicense,
        join: {
          from: "providers.id",
          to: "provider_licenses.providerId",
        },
      },
    };
  }
}
