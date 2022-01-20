/**
 * Represents an appointment on the Lina platform.
 */
import { Model } from "objection";
import { BaseModel } from "./base";
import { Note } from "./note";
import { Patient } from "./patient";
import { Provider } from "./provider";
import { ProviderSlot } from "./provider_slot";

export type AppointmentStatus =
  // Appointment has been created, but not confirmed
  // ID verification needed before confirmation
  | "PENDING"
  // confirmed but hasn't occured
  | "CONFIRMED"
  // Appointment has been completed
  | "COMPLETED"
  // patient did not show up
  | "NO_SHOW"
  // Other states
  | "CANCELED"
  | "LATE_CANCELED"
  | "RESCHEDULED";

export type AppointmentType = "INITIAL" | "FOLLOW_UP";

export interface AppointmentChecklist {
  verifiedIdentity: boolean;
  verifiedAddress: boolean;
}

interface AppointmentData {
  checklist?: AppointmentChecklist;
}

export class Appointment extends BaseModel {
  // UUID
  id!: string;
  // ID for the associated provider slot
  providerSlotId?: string;
  // provider ID
  providerId!: string;
  // patient ID
  patientId!: string;
  // Status (confirmed, completed, etc)
  status!: AppointmentStatus;
  // start time as a UTC timestamp
  startTime!: Date;
  // end time as a UTC timestamp
  endTime!: Date;
  // Stores checklist of stuff provider needs to do
  data!: AppointmentData;
  // ID for appointment in ePrescribe system
  treatEncounterId!: string;
  // URL used to access video chat for the appointment
  url!: string;

  providerSlot?: ProviderSlot;
  provider!: Provider;
  patient!: Patient;
  note!: Note;

  static get tableName() {
    return "appointments";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["providerId", "patientId", "status"],
      properties: {
        id: { type: "string" },
        providerId: { type: "string" },
        patientId: { type: "string" },
        status: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      provider: {
        relation: Model.BelongsToOneRelation,
        modelClass: Provider,
        join: {
          from: "appointments.providerId",
          to: "providers.id",
        },
      },
      patient: {
        relation: Model.BelongsToOneRelation,
        modelClass: Patient,
        join: {
          from: "appointments.patientId",
          to: "patients.id",
        },
      },
      providerSlot: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProviderSlot,
        join: {
          from: "appointments.providerSlotId",
          to: "providerSlots.id",
        },
      },
      note: {
        relation: Model.HasOneRelation,
        modelClass: Note,
        join: {
          from: "notes.appointmentId",
          to: "appointments.id",
        },
      },
    };
  }
}
