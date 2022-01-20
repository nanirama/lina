import { Model, PartialModelObject } from "objection";
import { BaseModel } from "../base";
import { Patient } from "../patient";
import { Provider } from "../provider";

/**
 * A patient medication. This can be provided after payment during the medical questionnaire,
 * or inserted after.
 */
class Medication extends BaseModel {
  id!: number;
  patientId!: string;
  prescriberId?: string;

  name!: string;
  homeMedication?: boolean;
  dosage?: string;
  frequency?: string;
  active?: boolean;
  startDate?: Date;
  endDate?: Date;

  // These are currently unused. See the Treat documentation
  // for descriptions of these fields.
  // Treat medications are not duplicated to our system yet, but these
  // fields were added with that possibility in mind.
  treatOrderId?: string;
  treatDrugCode?: string;
  treatOrderDrugName?: string;
  treatOrderQuantity?: number;
  treatOrderDosage?: string;
  treatOrderFrequency?: string;
  treatOrderDuration?: number;
  treatOrderSig?: string;
  treatSubstitutionAllowed?: boolean;
  treatEncounterId?: string;
  treatNumRefills?: number;

  patient!: Patient;
  prescriber?: Provider;

  static get tableName() {
    return "medications";
  }

  static get relationMappings() {
    return {
      patient: {
        relation: Model.BelongsToOneRelation,
        modelClass: Patient,
        join: {
          from: "medications.patientId",
          to: "patients.id",
        },
      },
    };
  }
}

export default Medication;

export type MedicationType = PartialModelObject<Medication>;
