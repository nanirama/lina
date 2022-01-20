import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("files", (table) => {
    table
      .uuid("id")
      .primary()
      .notNullable()
      .defaultTo(knex.raw("uuid_generate_v4()"));

    table.bigInteger("creator_id").notNullable();
    table.uuid("patient_id").notNullable();

    table.string("bucket").notNullable();
    table.string("key").notNullable();
    table.string("name").notNullable();
    table.string("file_type").notNullable();

    table.timestamps();

    table.foreign("creator_id").references("id").inTable("users");
    table.foreign("patient_id").references("id").inTable("patients");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("files");
}
