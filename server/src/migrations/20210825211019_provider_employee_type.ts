import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "providers",
    (table: Knex.AlterTableBuilder) => {
      table.string("employee_type");
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "providers",
    (table: Knex.AlterTableBuilder) => {
      table.dropColumn("employee_type");
    }
  );
}
