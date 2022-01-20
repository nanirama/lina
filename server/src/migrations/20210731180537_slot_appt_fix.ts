import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "appointments",
    (table: Knex.AlterTableBuilder) => {
      table.uuid("provider_slot_id").alter().nullable();
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "appointments",
    (table: Knex.AlterTableBuilder) => {
      table.uuid("provider_slot_id").alter().notNullable();
    }
  );
}
