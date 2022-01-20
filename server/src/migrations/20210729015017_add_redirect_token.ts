import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("tokens", (table: Knex.AlterTableBuilder) => {
    table.string("redirect_path");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("tokens", (table: Knex.AlterTableBuilder) => {
    table.dropColumn("redirect_path");
  });
}
