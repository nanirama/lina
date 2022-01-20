import { knex, Knex } from "knex";
export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (table: Knex.CreateTableBuilder) => {
    table.boolean("verified_email");
    table.boolean("verified_phone");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (table: Knex.CreateTableBuilder) => {
    table.dropColumn("verified_email");
    table.dropColumn("verified_phone");
  });
}
