/**
 * Entrypoint for the server code.
 * Binds the application to a port and listens.
 */
import errorHandler from "errorhandler";
import Knex from "knex";
import { Model } from "objection";
import knexConfig from "./knexfile";
import app from "./app";
import logger from "./config/logger";

import { scheduleCronJobs } from "./logic/cron";

// @ts-ignore
const kc = knexConfig[process.env.NODE_ENV || "development"];
const knex = Knex(kc);
Model.knex(knex);

if (
  process.env.NODE_ENV === "development" ||
  // @ts-ignore
  process.env.NODE_ENV === "staging"
) {
  app.use(errorHandler());
}

const server = app.listen(app.get("port"), () => {
  logger.info(
    `App is running at http://localhost:${app.get("port")} in ${app.get(
      "env"
    )} mode`
  );
  logger.info("Press CTRL-C to stop\n");

  if (process.env.NODE_APP_INSTANCE === "0") {
    scheduleCronJobs();
  }
});

export default server;
