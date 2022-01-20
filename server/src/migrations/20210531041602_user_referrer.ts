import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    "user_referrers",
    (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();
      table.bigInteger("user_id").notNullable();
      table.string("utm_source").nullable();
      table.string("utm_medium").nullable();
      table.string("utm_campaign").nullable();
      table.string("utm_content").nullable();
      table.string("utm_term").nullable();
      table.text("raw_url").nullable();
      table.timestamps();

      table.foreign("user_id").references("id").inTable("users");
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("user_referrers");
}
