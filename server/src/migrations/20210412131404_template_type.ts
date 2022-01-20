import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "note_templates",
    (table: Knex.CreateTableBuilder) => {
      table.text("value").notNullable().alter();
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "note_templates",
    (table: Knex.CreateTableBuilder) => {
      table.string("value").notNullable();
    }
  );
}
