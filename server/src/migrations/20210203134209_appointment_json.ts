import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "appointments",
    (table: Knex.CreateTableBuilder) => {
      table.jsonb("data");
    }
  );
}

export async function down(knex: Knex): Promise<void> {}
