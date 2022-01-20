import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    "referral_codes",
    (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();
      table.string("email").notNullable();
      table.string("code").notNullable();
      table.string("name").nullable();
      table.string("campaign").nullable();
      table.timestamps();
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("referral_codes");
}
