import { Model } from "objection";
import { Appointment } from "./appointment";
import { BaseModel } from "./base";
import { Patient } from "./patient";
import { Provider } from "./provider";

// export type NoteType = "initial" | "simple" | "soapNote" | "dapNote" | "other";
/**
 * only content and template ID are used actively
 */
export interface NoteData {
  // noteType: NoteType;
  content: string;
  templateId?: string;
  diagnosis?: Array<string>;
}

export class Note extends BaseModel {
  id!: string;
  providerId!: string;
  patientId!: string;
  // Associated appointment if created for an appointment
  appointmentId!: string;
  // effectively the same as locked
  editable!: boolean;
  // Whether the physician locked the note
  locked!: boolean;
  lockTime!: Date;
  data!: NoteData;

  provider!: Provider;
  patient!: Patient;
  appointment!: Appointment;

  static get tableName() {
    return "notes";
  }

  static get jsonSchema() {
    return {
      type: "object",
      //   required: [],
      properties: {
        id: { type: "string" },
        providerId: { type: "string" },
        patientId: { type: "string" },
        appointmentId: { type: "string" },
        editable: { type: "boolean" },
        locked: { type: "boolean" },

        data: {
          type: "object",
          properties: {
            noteType: { type: "string" },
            content: { type: "string" },
          },
        },
      },
    };
  }

  static get relationMappings() {
    return {
      provider: {
        relation: Model.BelongsToOneRelation,
        modelClass: Provider,
        join: {
          from: "notes.providerId",
          to: "providers.id",
        },
      },
      patient: {
        relation: Model.BelongsToOneRelation,
        modelClass: Patient,
        join: {
          from: "notes.patientId",
          to: "patients.id",
        },
      },
      appointment: {
        relation: Model.BelongsToOneRelation,
        modelClass: Appointment,
        join: {
          from: "notes.appointmentId",
          to: "appointments.id",
        },
      },
    };
  }
}
