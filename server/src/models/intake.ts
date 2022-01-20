import { Model } from "objection";
import React from "react";
import { BaseModel } from "./base";
import { Patient } from "./patient";

// TODO(sbb): All this should be moved when quizzes are dynamically served
export interface AnswerValue {
  key: string;
  content: string;
  value?: number;
  subtext?: string;
}

export interface QuizQuestionBase {
  question_type:
  | "MULTIPLE_CHOICE"
  | "FREEFORM"
  | "FREEFORM_MULTIPLE"
  // Note: interstitials don't contain any actual questions
  // just used in order to fit with the frontend structure we
  // have currently. Won't be relevant when switching to Savvy
  | "INTERSTITIAL"
  | "CUSTOM";
  key: string;
  content: string;
  pretext?: string;
  subtext?: string;
  noneDesc?: string;
  custom?: (answers: Array<QuestionResponse>) => React.ReactElement;
}

export interface MultipleChoiceQuestion extends QuizQuestionBase {
  question_type: "MULTIPLE_CHOICE";
  choices: Array<AnswerValue>;
  allowMultiple?: boolean;
}

export interface FreeformQuestion extends QuizQuestionBase {
  question_type: "FREEFORM";
  inputType: "text" | "textarea";
}

export interface FreeformMultipleQuestion extends QuizQuestionBase {
  question_type: "FREEFORM_MULTIPLE";
  placeholder: string;
  suggestions?: Array<string>;
}

export interface InterstitialQuestion extends QuizQuestionBase {
  question_type: "INTERSTITIAL";
  custom: (answers: Array<QuestionResponse>) => React.ReactElement;
}

export interface CustomQuestion extends QuizQuestionBase {
  question_type: "CUSTOM";
  custom: (answers: Array<QuestionResponse>) => React.ReactElement;
}

export type Question =
  | MultipleChoiceQuestion
  | FreeformQuestion
  | FreeformMultipleQuestion
  | InterstitialQuestion
  | CustomQuestion;

export interface QuestionResponse {
  question: QuizQuestionBase;
  answer: Array<AnswerValue>;
}
export interface QuizResponse {
  answers: Array<QuestionResponse>;
  followUp?: Array<QuestionResponse>;
}

export interface QuizType {
  questions: Array<Question>;
}

/**
 * A row containing a giant JSON blob with a quiz response sent from the frontend.
 * This is a relic of a time before we were certain of a schema we wanted to use.
 * This will be deprecated when the migration to Savvy is complete.
 */
export class IntakeResponse extends BaseModel {
  id!: string;
  patientId!: string;
  response!: QuizResponse;
  eligible!: boolean;
  // e.g. previous history of a condition not treated by Lina
  rejectionReason!: string;

  patient!: Patient;

  static get tableName() {
    return "intakeResponses";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "uuid" },
        patientId: { type: "string" },
        response: {
          type: "object",
          properties: {
            answers: { type: "array" },
          },
        },
      },
    };
  }

  static get relationMappings() {
    return {
      patient: {
        relation: Model.BelongsToOneRelation,
        modelClass: Patient,
        join: {
          from: "intakeResponses.patientId",
          to: "patients.id",
        },
      },
    };
  }
}
