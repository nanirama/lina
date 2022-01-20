import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("assessment_responses", (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();
      table.uuid("patient_id").notNullable();
      table.string("assessment_type").notNullable();
      table.integer("gad_score").nullable();
      table.integer("phq_score").nullable();
      table.timestamps();

      table.foreign("patient_id").references("id").inTable("patients");
    })
    .createTable("assessment_items", (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();
      table.bigInteger("assessment_id").notNullable();
      table.string("question_type").notNullable();
      table.string("question_key").notNullable();
      table.string("answer_key").notNullable();
      table.string("answer_raw").nullable();
      table.integer("answer_value").nullable();
      table.timestamps();

      table
        .foreign("assessment_id")
        .references("id")
        .inTable("assessment_responses");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("assessment_items")
    .dropTableIfExists("assessment_responses");
}
