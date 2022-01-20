import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "providers",
    (table: Knex.AlterTableBuilder) => {
      table.text("bio");
      table.string("public_pic_path");
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "providers",
    (table: Knex.AlterTableBuilder) => {
      table.dropColumn("bio");
      table.dropColumn("public_pic_path");
    }
  );
}
