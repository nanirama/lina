import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("patients", (table: Knex.AlterTableBuilder) => {
    table.string("pharmacy_preference");
    table.string("persona_inquiry_id");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("patients", (table: Knex.AlterTableBuilder) => {
    table.dropColumn("pharmacy_preference");
    table.dropColumn("persona_inquiry_id");
  });
}
