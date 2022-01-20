import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("allergies", (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();
      table.uuid("patient_id").notNullable();
      table.string("name").notNullable();
      table.string("reaction").nullable();
      table.string("severity").nullable();
      table.timestamps();

      table.foreign("patient_id").references("id").inTable("patients");
    })
    .createTable("medications", (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();
      table.uuid("patient_id").notNullable();
      table.uuid("prescriber_id").nullable();
      table.string("name").notNullable();
      table.boolean("home_medication");
      table.string("dosage").nullable();
      table.string("frequency").nullable();
      table.boolean("active");
      table.dateTime("start_date").nullable();
      table.dateTime("end_date").nullable();

      table.string("treat_order_id").nullable();
      table.string("treat_drug_code").nullable();
      table.string("treat_order_drug_name").nullable();
      table.integer("treat_order_quantity").nullable();
      table.string("treat_order_dosage").nullable();
      table.string("treat_order_frequency").nullable();
      table.integer("treat_order_duration").nullable();
      table.string("treat_order_dig").nullable();
      table.boolean("treat_substitution_allowed").nullable();
      table.string("treat_encounter_id").nullable();
      table.integer("treat_num_refills").nullable();

      table.timestamps();

      table.foreign("patient_id").references("id").inTable("patients");
      table.foreign("prescriber_id").references("id").inTable("providers");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("medications")
    .dropTableIfExists("allergies");
}
