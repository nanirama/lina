import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "provider_slots",
    (table: Knex.CreateTableBuilder) => {
      table.time("start_time").nullable().alter();
      table.time("end_time").nullable().alter();

      table.dateTime("slot_start").nullable();
      table.dateTime("slot_end").nullable();
      table.dropUnique(["provider_id", "slot_date", "start_time"]);
      table.unique(["provider_id", "slot_date", "slot_start"]);
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "provider_slots",
    (table: Knex.CreateTableBuilder) => {
      table.time("start_time").notNullable().alter();
      table.time("end_time").notNullable().alter();
      table.dropColumn("slot_start");
      table.dropColumn("slot_end");
      table.dropUnique(["provider_id", "slot_date", "slot_start"]);
      table.unique(["provider_id", "slot_date", "start_time"]);
    }
  );
}
