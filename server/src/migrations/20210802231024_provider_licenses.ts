import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    "provider_licenses",
    (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();
      table.uuid("provider_id").notNullable();
      table.string("state").notNullable();
      table.boolean("active").notNullable();
      table.timestamp("expiry_date");

      table.foreign("provider_id").references("id").inTable("providers");
      table.timestamps();
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("provider_licenses");
}
