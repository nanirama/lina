import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("thread_participants", (table: Knex.CreateTableBuilder) => {
      table.integer("thread_id").references("threads.id");
      table.integer("user_id").references("users.id");
      table.dateTime("last_read").nullable();
      table.boolean("archived").defaultTo(false);

      table.timestamps();

      table.unique(["thread_id", "user_id"]);
    })
    .alterTable("threads", (table: Knex.AlterTableBuilder) => {
      table.string("subject");
      table.dropColumns("provider_id", "patient_id");
    })
    .alterTable("messages", (table: Knex.AlterTableBuilder) => {
      table.dropColumns("recipient_id", "deliver_time", "read_time");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("thread_participants")
    .alterTable("threads", (table: Knex.AlterTableBuilder) => {
      table.dropColumns("subject", "thread_type");
    })
    .alterTable("messages", (table: Knex.AlterTableBuilder) => {
      table.bigInteger("recipient_id");
      table.timestamp("deliver_time");
      table.timestamp("read_time");
    });
}
