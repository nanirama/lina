import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "patients",
    (table: Knex.CreateTableBuilder) => {
      table.string("license_file_id");

      table.foreign("license_file_id", "files");
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "patients",
    (table: Knex.CreateTableBuilder) => {
      table.dropColumn("license_file_id");
    }
  );
}
