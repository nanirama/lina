import { Model, ModelObject, PartialModelObject } from "objection";
import { BaseModel } from "../base";
import { Patient } from "../patient";

/**
 * A patient allergy, provided after payment during the medical questionnaire
 */
class Allergy extends BaseModel {
  id!: number;
  patientId!: string;
  name!: string;
  reaction?: string;
  severity?: string;

  patient!: Patient;

  static get tableName() {
    return "allergies";
  }

  static get relationMappings() {
    return {
      patient: {
        relation: Model.BelongsToOneRelation,
        modelClass: Patient,
        join: {
          from: "allergies.patientId",
          to: "patients.id",
        },
      },
    };
  }
}

export default Allergy;
export type AllergyType = PartialModelObject<Allergy>;
