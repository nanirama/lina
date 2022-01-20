import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(
        "provider_patient_map",
        (table: Knex.CreateTableBuilder) => {
            table.uuid("provider_id").notNullable();
            table.uuid("patient_id").notNullable();

            table.foreign("provider_id").references("id").inTable("providers");
            table.foreign("patient_id").references("id").inTable("patients");

            table.unique(["provider_id", "patient_id"]);
            table.timestamps();
        }
    ).raw(`
        insert into provider_patient_map select distinct provider_id, patient_id from appointments; 
    `);
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("provider_patient_map");
}
