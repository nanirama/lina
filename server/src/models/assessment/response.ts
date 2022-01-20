import { Model } from "objection";
import { BaseModel } from "../base";
import { Patient } from "../patient";
import AssessmentItem from "./item";

export type AssessmentType = "INITIAL" | "FOLLOWUP";

/**
 * One assessment response for a patient who has completed registration.
 * For users who have not completed registration, a single row with a giant JSON
 * blob is stored in IntakeResponse, which is a relic of a time before we were
 * certain of a schema we wanted to use.
 */
class AssessmentResponse extends BaseModel {
  id!: number;
  patientId!: string;
  assessmentType!: AssessmentType;
  phqScore!: number;
  gadScore!: number;

  items!: Array<AssessmentItem>;

  static get tableName() {
    return "assessment_responses";
  }

  static get relationMappings() {
    return {
      patient: {
        relation: Model.BelongsToOneRelation,
        modelClass: Patient,
        join: {
          from: "assessmentResponses.patientId",
          to: "patients.id",
        },
      },
      items: {
        relation: Model.HasManyRelation,
        modelClass: AssessmentItem,
        join: {
          from: "assessmentResponses.id",
          to: "assessmentItems.assessmentId",
        },
      },
    };
  }
}

export default AssessmentResponse;
