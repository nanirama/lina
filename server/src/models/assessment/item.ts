import { Model } from "objection";
import { BaseModel } from "../base";
import AssessmentResponse from "./response";

export type QuestionType =
  | "PHQ"
  | "GAD"
  | "ADHD"
  | "INSOMNIA"
  | "INITIAL_INTAKE"
  | "OTHER";

/**
 * This is a single answer to a question during onboarding.
 * Note that a question that is multiselect can have multiple answers
 * (multiple rows with the same questionId).
 */
class AssessmentItem extends BaseModel {
  id!: number;
  assessmentId!: string;
  questionType!: QuestionType;
  questionKey!: string;
  answerKey!: string;
  answerRaw!: string;
  answerValue!: number;

  assessment!: AssessmentResponse;

  static get tableName() {
    return "assessment_items";
  }

  static get relationMappings() {
    return {
      assessment: {
        relation: Model.BelongsToOneRelation,
        modelClass: AssessmentResponse,
        join: {
          from: "assessmentItems.assessmentId",
          to: "assessmentResponses.id",
        },
      },
    };
  }
}

export default AssessmentItem;
