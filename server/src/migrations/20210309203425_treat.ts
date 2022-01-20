import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "providers",
    (table: Knex.CreateTableBuilder) => {
      table.text("treat_refresh_token");
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "providers",
    (table: Knex.CreateTableBuilder) => {
      table.dropColumn("treat_refresh_token");
    }
  );
}
