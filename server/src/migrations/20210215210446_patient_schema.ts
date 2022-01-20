import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "patients",
    (table: Knex.CreateTableBuilder) => {
      table.string("gender");
      table.string("client_status");
      table.timestamp("consent_sign_time");
      table.jsonb("medications").defaultTo([]);
      table.jsonb("allergies").defaultTo([]);
      table.jsonb("chart_misc");
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "patients",
    (table: Knex.CreateTableBuilder) => {
      table.dropColumns(
        "gender",
        "client_status",
        "consent_sign_time",
        "medications",
        "allergies",
        "chart_misc"
      );
    }
  );
}
