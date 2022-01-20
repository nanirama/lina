import { Model } from "objection";
import { BaseModel } from "./base";
import { Provider } from "./provider";

/**
 * A note template created by a provider for patient chart notes.
 */
export class NoteTemplate extends BaseModel {
  id!: number;
  providerId!: string;
  // User defined name for the template
  name!: string;
  //  * value is an HTML blob that is used by the frontend to render the template.
  value!: string;

  static get tableName() {
    return "note_templates";
  }

  static get jsonSchema() {
    return {
      type: "object",
      require: ["name", "value"],
      properties: {
        id: { type: "string" },
        providerId: { type: "string" },
        name: { type: "string" },
        value: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      provider: {
        relation: Model.BelongsToOneRelation,
        modelClass: Provider,
        join: {
          from: "note_templates.providerId",
          to: "providers.id",
        },
      },
    };
  }
}
