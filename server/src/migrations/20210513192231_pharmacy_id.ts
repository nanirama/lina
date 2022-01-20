import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable(
    "patients",
    (table: Knex.AlterTableBuilder) => {
      table.string("treat_pharmacy_id").nullable();
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable(
    "patients",
    (table: Knex.AlterTableBuilder) => {
      table.dropColumn("treat_pharmacy_id");
    }
  );
}
