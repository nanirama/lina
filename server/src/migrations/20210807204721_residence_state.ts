import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("patients", (table: Knex.AlterTableBuilder) => {
    table.string("residence_state");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("patients", (table: Knex.AlterTableBuilder) => {
    table.dropColumn("residence_state");
  });
}
