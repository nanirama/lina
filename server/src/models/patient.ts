import { Model } from "objection";
import { Appointment } from "./appointment";
import { Note } from "./note";
import { User } from "./user";
import { EmergencyContact } from "./emergency_contact";
import { BaseModel } from "./base";
import { IntakeResponse } from "./intake";
import { File as HealthgentFile } from "./file";
import Allergy from "./chart/allergy";
import Medication from "./chart/medication";

export type SubscriptionStatus = "ACTIVE" | "PAST_DUE" | "INACTIVE";
export type PharmacyPreference = "LOCAL" | "MAIL_ORDER";

/**
 * Represents a Lina patient.
 */
export class Patient extends BaseModel {
  id!: string;
  userId!: number;
  // Filled in once a stripe customer object is created
  stripeCustomerId?: string;
  // TODO: use this field
  emailConfirmed!: boolean;
  // UUID representing an s3 file upload with the patient's license
  licenseFileId!: string;
  gender!: string;
  subscriptionStatus!: SubscriptionStatus;
  // Filled in at registration when they consent to TOS
  consentSignTime!: Date;
  medications!: Array<Medication>;
  allergies!: Array<Allergy>;
  // Created when ID verification is performed by Persona
  personaInquiryId!: string;
  // ID of user in ePrescribe system
  treatUid!: string;
  // pharmacy ID provided by the treat API
  treatPharmacyId!: string;
  // Did they elect to share a primary care physician
  sharePcp?: boolean;
  // Did they elect to share their therapist
  shareTherapist?: boolean;
  // Type of pharmacy they prefer
  // Note that Lina doesn't actively work with Ridgeway Mail Order
  // anymore to my knowledge
  pharmacyPreference!: PharmacyPreference;
  // ID of the subscription from the stripe API
  stripeSubscriptionId!: string;
  // State the user lives in, provided at initial registration
  // Their full address is stored separately and is created
  // after payment
  residenceState!: string;

  user!: User;
  appointments!: Array<Appointment>;
  notes!: Array<Note>;
  intakeResponse!: IntakeResponse;
  emergencyContact!: EmergencyContact;
  licenseFile!: HealthgentFile;

  static get tableName() {
    return "patients";
  }

  static get jsonSchema() {
    return {
      type: "object",
      //   required: [],
      properties: {
        id: { type: "uuid" },
        userId: { type: "integer" },
        stripeCustomerId: { type: "string" },
        emailConfirmed: { type: "boolean" },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "patients.userId",
          to: "users.id",
        },
      },
      appointments: {
        relation: Model.HasManyRelation,
        modelClass: Appointment,
        join: {
          from: "patients.id",
          to: "appointments.patientId",
        },
      },
      notes: {
        relation: Model.HasManyRelation,
        modelClass: Note,
        join: {
          from: "patients.id",
          to: "notes.patientId",
        },
      },
      emergencyContact: {
        relation: Model.HasOneRelation,
        modelClass: EmergencyContact,
        join: {
          from: "patients.id",
          to: "emergencyContacts.patientId",
        },
      },
      intakeResponse: {
        relation: Model.HasOneRelation,
        modelClass: IntakeResponse,
        join: {
          from: "patients.id",
          to: "intakeResponses.patientId",
        },
      },

      files: {
        relation: Model.HasManyRelation,
        modelClass: HealthgentFile,
        join: {
          from: "patients.id",
          to: "files.patientId",
        },
      },

      licenseFile: {
        relation: Model.HasOneRelation,
        modelClass: HealthgentFile,
        join: {
          from: "patients.licenseFileId",
          to: "files.id",
        },
      },

      allergies: {
        relation: Model.HasManyRelation,
        modelClass: Allergy,
        join: {
          from: "patients.id",
          to: "allergies.patientId",
        },
      },

      medications: {
        relation: Model.HasManyRelation,
        modelClass: Medication,
        join: {
          from: "patients.id",
          to: "medications.patientId",
        },
      },
    };
  }
}
