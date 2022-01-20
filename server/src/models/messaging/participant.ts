import { Model, ModelObject } from "objection";
import { BaseModel } from "../base";
import { Thread } from "./thread";
import { User } from "../user";

/**
 * A participant in a conversation thread. Note that all
 * messaging types use user IDs since different user types
 * (patient, provider, admin) can participate in a thread.
 */
export class ThreadParticipant extends BaseModel {
  threadId!: number;
  userId!: number;
  lastRead!: Date;
  archived!: boolean;

  static get tableName() {
    return "threadParticipants";
  }

  static get relationMappings() {
    return {
      thread: {
        relation: Model.BelongsToOneRelation,
        modelClass: Thread,
        join: {
          from: "threadParticipants.threadId",
          to: "threads.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "threadParticipants.threadId",
          to: "users.id",
        },
      },
    };
  }
}
