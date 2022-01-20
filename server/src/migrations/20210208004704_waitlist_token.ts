import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("waitlist_emails", (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();
      table.string("email").notNullable();
      table.string("state");
      table.timestamps();
    })
    .createTable("reset_tokens", (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();
      table.bigInteger("user_id").notNullable();
      table.boolean("used").notNullable();
      table.timestamp("expiration").notNullable();
      table.string("token").notNullable();
      table.timestamps();

      table.foreign("user_id").references("id").inTable("users");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("waitlist_emails").dropSchema("reset_tokens");
}
