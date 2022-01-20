/**
 * Wrapper to load knex for use in scripts
 */
import knexConfig from "../src/knexfile";
import Knex from "knex";
import { Model } from "objection";

export const initKnex = () => {
  // @ts-ignore
  const kc = knexConfig[process.env.NODE_ENV || "development"];
  Model.knex(Knex(kc));
};
