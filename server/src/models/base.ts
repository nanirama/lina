/**
 * Base model used by all other ORM models in the codebase.
 * handles updating `created_at` and `updated_at` fields.
 */
import { Model } from "objection";

export class BaseModel extends Model {
  createdAt!: Date;
  updatedAt!: Date;

  $beforeInsert() {
    const date = new Date();
    this.createdAt = date;
    this.updatedAt = date;
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
