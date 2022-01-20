/**
 * Database configuration for unit tests
 * This mirrors what you see in knexfile.ts but for a local test environment.
 */
import Knex from "knex";
import { knexSnakeCaseMappers, Model } from "objection";

const DATABASE = "healthgent_test_api";

/**
 *
 * @param raw false if the object returned should operate
 * on `healthgent_test_api`, true if it should just connect
 * to postgres and not specify a DB name
 * @returns
 */
const getKnexConfig = (raw?: boolean) => {
  return Knex({
    client: "pg",
    connection: {
      database: raw ? undefined : DATABASE,
      user: "postgres",
      password: "postgres",
      host: "localhost",
      port: 5432,
    },
    migrations: {
      directory: "src/migrations",
    },
    seeds: {
      directory: "src/seeds",
    },
    ...knexSnakeCaseMappers(),
  });
};

/**
 * Attaches the ORM (Objection.js) to the SQL
 * query builder (knex)
 */
export const attachKnexToObjection = (knex: any) => {
  Model.knex(knex);
};

export const clearDb = async () => {
  const knex = getKnexConfig();
  await knex("messages").del();
  await knex("threadParticipants").del();
  await knex("threads").del();
  await knex("notes").del();
  await knex("note_templates").del();
  await knex("external_providers").del();
  await knex("intakeResponses").del();
  await knex("appointments").del();
  await knex("allergies").del();
  await knex("medications").del();
  await knex("provider_patient_map").del();
  await knex("provider_licenses").del();
  await knex("provider_slots").del();
  await knex("emergency_contacts").del();
  await knex("patients").del();
  await knex("providers").del();
  await knex("addresses").del();
  await knex("users").del();
  attachKnexToObjection(knex);
};
