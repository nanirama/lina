import { ModelObject, Model } from "objection";
import { BaseModel } from "../base";
import { Message } from "./message";
import { Patient } from "../patient";
import { Provider } from "../provider";
import { ThreadParticipant } from "./participant";

export type ThreadType =
  | "TREATMENT_QUESTION"
  | "PRESCRIPTION_REFILL"
  | "CUSTOMER_SUPPORT";

/**
 * A single message thread in the messaging system
 */
export class Thread extends BaseModel {
  id!: number;
  threadType!: ThreadType;
  subject!: string;

  participants!: Array<ThreadParticipant>;
  messages!: Array<Message>;

  static get tableName() {
    return "threads";
  }

  static get relationMappings() {
    return {
      messages: {
        relation: Model.HasManyRelation,
        modelClass: Message,
        join: {
          from: "threads.id",
          to: "messages.threadId",
        },
      },
      participants: {
        relation: Model.HasManyRelation,
        modelClass: ThreadParticipant,
        join: {
          from: "threads.id",
          to: "threadParticipants.threadId",
        },
      },
    };
  }
}

export type ThreadApiType = ModelObject<Thread>;
