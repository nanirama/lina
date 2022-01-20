import { Model } from "objection";
import { BaseModel } from "./base";
import { Patient } from "./patient";
import { User } from "./user";

/**
 * Only ID_PIC is used currently. We don't take insurance,
 * and there is no mechanism on the patient chart frontend to
 * upload a file.
 */
export type FileType =
  | "INSURANCE_FRONT"
  | "INSURANCE_BACK"
  | "ID_PIC"
  | "CHART_UPLOAD";

export class File extends BaseModel {
  id!: string;

  // Amazon S3 bucket
  bucket!: string;
  // key for the file in S3
  key!: string;
  name!: string;
  fileType!: FileType;
  // This is a user ID
  creatorId!: number;
  patientId!: string;

  creator!: User;
  patient!: Patient;

  static get tableName() {
    return "files";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["bucket", "key", "creatorId", "patientId", "fileType"],
    };
  }

  static get relationMappings() {
    return {
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "files.creatorId",
          to: "users.id",
        },
      },

      patient: {
        relation: Model.BelongsToOneRelation,
        modelClass: Patient,
        join: {
          from: "files.patientId",
          to: "patients.id",
        },
      },
    };
  }
}
