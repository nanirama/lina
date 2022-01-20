import { Model, ModelObject } from "objection";
import { BaseModel } from "./base";
import { Patient } from "./patient";

/**
 * Emergency contact for a patient
 */
export class EmergencyContact extends BaseModel {
  patientId!: string;
  firstName!: string;
  lastName!: string;
  relationship!: string;
  phoneNumber!: string;

  static get tableName() {
    return "emergencyContacts";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "uuid" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        relationship: { type: "date" },
        phone: { type: "string" },
        email: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      patient: {
        relation: Model.BelongsToOneRelation,
        modelClass: Patient,
        join: {
          from: "emergencyContacts.patientId",
          to: "patients.id",
        },
      },
    };
  }
}

export type EmergencyContactType = ModelObject<EmergencyContact>;
