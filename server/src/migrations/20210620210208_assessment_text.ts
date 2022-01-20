import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "assessment_items",
    (table: Knex.AlterTableBuilder) => {
      table.text("answer_raw").alter();
    }
  );
}

export async function down(knex: Knex): Promise<void> {}
