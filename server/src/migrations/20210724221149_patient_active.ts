import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("patients", (table: Knex.AlterTableBuilder) => {
    table.string("subscription_status");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("patients", (table: Knex.AlterTableBuilder) => {
    table.dropColumn("subscription_status");
  });
}
