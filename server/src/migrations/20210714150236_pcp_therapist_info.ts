import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("external_providers", (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();
      table.string("practitioner_type");
      table.string("title");
      table.string("name");
      table.string("first_name");
      table.string("last_name");
      table.string("email");
      table.string("phone");
      table.string("fax");
      table.uuid("patient_id");

      table.timestamps();
      table.foreign("patient_id").references("id").inTable("patients");
    })
    .alterTable("patients", (table: Knex.AlterTableBuilder) => {
      table.boolean("share_pcp");
      table.boolean("share_therapist");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("external_providers")
    .alterTable("patients", (table: Knex.AlterTableBuilder) => {
      table.dropColumn("share_pcp");
      table.dropColumn("share_therapist");
    });
}
