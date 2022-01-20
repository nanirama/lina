import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (table: Knex.AlterTableBuilder) => {
    table.boolean("disabled");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (table: Knex.AlterTableBuilder) => {
    table.dropColumn("disabled");
  });
}
