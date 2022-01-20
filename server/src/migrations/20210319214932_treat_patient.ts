import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("patients", (table: Knex.CreateTableBuilder) => {
      table.string("treat_uid");
    })
    .alterTable("appointments", (table: Knex.CreateTableBuilder) => {
      table.string("treat_encounter_id");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("patients", (table: Knex.CreateTableBuilder) => {
      table.dropColumn("treat_uid");
    })
    .alterTable("appointments", (table: Knex.CreateTableBuilder) => {
      table.dropColumn("treat_encounter_id");
    });
}
