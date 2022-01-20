import { knex, Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary().notNullable();
      table.string("account_type").notNullable();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.date("birthdate").notNullable();
      table.string("phone").notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.timestamps();
    })
    .createTable("addresses", (table) => {
      table.increments("id").primary().notNullable();
      table.bigInteger("user_id").notNullable();
      table.string("street_address");
      table.string("unit_number");
      table.string("city");
      table.string("state");
      table.string("zip");
      table.timestamps();

      table.foreign("user_id").references("id").inTable("users");
    })
    .createTable("patients", (table) => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.bigInteger("user_id").notNullable();
      table.string("stripe_customer_id");
      table.boolean("email_confirmed").defaultTo(false);
      table.timestamps();

      table.foreign("user_id").references("id").inTable("users");
    })
    .createTable("providers", (table) => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .unique()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.bigInteger("user_id").notNullable();
      table.string("title");
      table.string("doxy_link");
      table.timestamps();

      table.foreign("user_id").references("id").inTable("users");
    })
    .createTable("emergency_contacts", (table) => {
      table.increments("id").primary().notNullable();
      table.uuid("patient_id").notNullable();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("relationship").notNullable();
      table.string("phone_number").notNullable();
      table.timestamps();

      table.foreign("patient_id").references("id").inTable("patients");
    })
    .createTable("intake_responses", (table) => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .unique()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("patient_id");
      table.jsonb("response");
      table.timestamps();

      table.foreign("patient_id").references("id").inTable("patients");
    })
    .createTable("provider_slots", (table) => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .unique()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("provider_id").notNullable();
      table.date("slot_date").notNullable();
      table.time("start_time").notNullable();
      table.time("end_time").notNullable();
      table.boolean("taken").notNullable().defaultTo(false);
      table.timestamps();

      table.foreign("provider_id").references("id").inTable("providers");
      table.unique(["provider_id", "slot_date", "start_time"]);
    })
    .createTable("appointments", (table) => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .unique()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("provider_id").notNullable();
      table.uuid("patient_id").notNullable();
      table.uuid("provider_slot_id").notNullable();
      table.string("status").notNullable();
      table.timestamps();

      table.foreign("provider_id").references("id").inTable("providers");
      table.foreign("patient_id").references("id").inTable("patients");
      table
        .foreign("provider_slot_id")
        .references("id")
        .inTable("provider_slots");
    })
    .createTable("notes", (table) => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .unique()
        .defaultTo(knex.raw("uuid_generate_v4()"));

      table.jsonb("data");

      table.uuid("provider_id").notNullable();
      table.uuid("patient_id").notNullable();
      table.uuid("appointment_id");
      table.boolean("editable");
      table.boolean("locked");
      table.timestamp("lock_time");
      table.timestamps();

      table.foreign("provider_id").references("id").inTable("providers");
      table.foreign("patient_id").references("id").inTable("patients");
      table.foreign("appointment_id").references("id").inTable("appointments");
    });
}

export async function down(knex: Knex): Promise<void> {
  throw new Error(
    "Downward migrations are not supported. Restore from backup."
  );
}
