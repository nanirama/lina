import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "appointments",
    (table: Knex.AlterTableBuilder) => {
      table.string("url");
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "appointments",
    (table: Knex.AlterTableBuilder) => {
      table.dropColumn("url");
    }
  );
}
