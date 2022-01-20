import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("users", (table: Knex.AlterTableBuilder) => {
      table.date("birthdate").nullable().alter();
    })
    .alterTable("intake_responses", (table: Knex.AlterTableBuilder) => {
      table.boolean("eligible").nullable();
      table.string("rejection_reason").nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  throw Error("Can not downgrade from this migration");
}
