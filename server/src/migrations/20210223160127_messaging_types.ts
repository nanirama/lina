import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("threads", (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();
      table.uuid("provider_id");
      table.uuid("patient_id").notNullable();
      table.string("thread_type");
      table.timestamps();

      table.foreign("provider_id").references("id").inTable("providers");
      table.foreign("patient_id").references("id").inTable("patients");
    })
    .createTable("messages", (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();
      table.bigInteger("sender_id");
      table.bigInteger("recipient_id").notNullable();
      table.bigInteger("thread_id").notNullable();
      table.text("content").notNullable();
      table.timestamp("deliver_time");
      table.timestamp("read_time");
      table.timestamps();

      table.foreign("sender_id").references("id").inTable("users");
      table.foreign("recipient_id").references("id").inTable("users");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("messages").dropTable("threads");
}
