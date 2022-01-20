import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("patients", (table: Knex.AlterTableBuilder) => {
    table.dropColumns("medications", "allergies", "chart_misc");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("patients", (table: Knex.AlterTableBuilder) => {
    table.jsonb("medications");
    table.jsonb("allergies");
    table.jsonb("chart_misc");
  });
}
