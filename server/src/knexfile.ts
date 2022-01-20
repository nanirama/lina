/**
 * Used to configure knex, the SQL query builder. Note that this
 * is where the snake_case to camelCase mapping occurs.
 */
import { knexSnakeCaseMappers } from "objection";
export default {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.POSTGRES_HOST || "localhost",
      database: "healthgent_api_dev",
      user: "postgres",
      password: "postgres",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    ...knexSnakeCaseMappers(),
  },

  staging: {
    client: "postgresql",
    connection: {
      host: "healthgent-staging-1.cyb37702eg7l.us-east-1.rds.amazonaws.com",
      port: 5432,
      database: "healthgent_api_dev",
      user: "postgres",
      password: process.env.POSTGRES_STAGING_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    ...knexSnakeCaseMappers(),
  },

  production: {
    client: "postgresql",
    connection: {
      host: "healthgent-production-1.cyb37702eg7l.us-east-1.rds.amazonaws.com",
      post: 5432,
      database: "healthgent_api",
      user: "postgres",
      password: process.env.POSTGRES_PRODUCTION_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    ...knexSnakeCaseMappers(),
  },
};
