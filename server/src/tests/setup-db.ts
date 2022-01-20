/**
 * Database configuration for unit tests
 * This mirrors what you see in knexfile.ts but for a local test environment.
 */
import Knex from "knex";
import { knexSnakeCaseMappers } from "objection";

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
 * Drop existing DB and create a new test one
 */
export const createTestDatabase = async () => {
  let knex = getKnexConfig(true);
  await knex.raw(`DROP DATABASE IF EXISTS ${DATABASE}`);
  await knex.raw(`CREATE DATABASE ${DATABASE}`);

  knex = getKnexConfig();
  await knex.migrate.latest();
};

/**
 * Seed a test database with data from the seeds
 * defined in /seeds
 */
export const seedTestDatabase = async () => {
  const knex = getKnexConfig();

  await knex.migrate.latest();
  await knex.seed.run();
};

export const setupTestDb = async () => {
  await createTestDatabase();
};

setupTestDb()
  .then(() => {
    console.log("Db setup complete");
    process.exit(0);
  })
  .catch((e: Error) => {
    console.log(e);
    process.exit(1);
  });
