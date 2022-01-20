import { Model, ModelObject, PartialModelObject } from "objection";
import { BaseModel } from "./base";
import { Patient } from "./patient";

export type ExternalPractitionerType = "PCP" | "THERAPIST";

/**
 * Represents a provider the patient sees outside of the practice.
 * Can be their primary care physician or therapist.
 */
export class ExternalProvider extends BaseModel {
  practitionerType!: string;
  title!: string;
  name!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  phone!: string;
  fax!: string;
  patientId!: string;

  patient!: Patient;

  static get tableName() {
    return "externalProviders";
  }

  static get relationMappings() {
    return {
      patient: {
        relation: Model.BelongsToOneRelation,
        modelClass: Patient,
        join: {
          from: "externalProviders.patientId",
          to: "patients.id",
        },
      },
    };
  }
}

export type ExternalProviderType = PartialModelObject<ExternalProvider>;
