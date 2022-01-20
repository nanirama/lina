import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("ops_notification_queue", (table: Knex.AlterTableBuilder) => {
    table.time("sent_at").alter().nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("ops_notification_queue", (table: Knex.AlterTableBuilder) => {
    table.time("sent_at").alter().notNullable();
  });
}
