import { Model, ModelObject } from "objection";
import { BaseModel } from "../base";
import { Thread } from "./thread";
import { User } from "../user";

/**
 * A single message in our platform.
 */
export class Message extends BaseModel {
  id!: number;
  senderId!: number;
  threadId!: number;
  content!: string;

  thread!: Thread;
  sender!: User;

  static get tableName() {
    return "messages";
  }

  static get relationMappings() {
    return {
      thread: {
        relation: Model.BelongsToOneRelation,
        modelClass: Thread,
        join: {
          from: "messages.threadId",
          to: "threads.id",
        },
      },
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "messages.senderId",
          to: "users.id",
        },
      },
      recipient: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "messages.senderId",
          to: "users.id",
        },
      },
    };
  }
}

export type MessageApiType = ModelObject<Message>;
