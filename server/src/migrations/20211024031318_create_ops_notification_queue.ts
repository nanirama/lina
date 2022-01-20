import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("ops_notification_queue", (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();
      table.string("message").notNullable();
      table.string("type").notNullable();
      table.boolean("sent").nullable();
      table.time("sent_at").notNullable();
      table.timestamps();
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("ops_notification_queue")
}
