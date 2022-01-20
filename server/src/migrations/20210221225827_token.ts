import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("tokens", (table: Knex.CreateTableBuilder) => {
    table.increments("id").primary().notNullable();
    table.bigInteger("user_id").notNullable();
    table.boolean("used").notNullable();
    table.timestamp("expiration").notNullable();
    table.string("token_type").notNullable();
    table.string("value").notNullable();
    table.jsonb("metadata");
    table.timestamps();

    table.foreign("user_id").references("id").inTable("users");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("tokens");
}
