import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    "note_templates",
    (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();
      table.uuid("provider_id");
      table.string("name").notNullable();
      table.string("value").notNullable();
      table.timestamps();

      table.foreign("provider_id").references("id").inTable("providers");
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("note_templates");
}
