import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("appointments", (table: Knex.AlterTableBuilder) => {
      table.dateTime("start_time").nullable();
      table.dateTime("end_time").nullable();
    })
    .alterTable("provider_slots", (table: Knex.AlterTableBuilder) => {
      table.dropColumns("start_time", "end_time");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("appointments", (table: Knex.AlterTableBuilder) => {
      table.dropColumns("start_time", "end_time");
    })
    .alterTable("provider_slots", (table: Knex.AlterTableBuilder) => {
      table.time("start_time").nullable();
      table.time("end_time").nullable();
    });
}
