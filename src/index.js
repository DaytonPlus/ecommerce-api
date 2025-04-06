import express from "express";
import cors from "cors";
import helmet from "helmet";
import { pool } from "./config/database.js";
import initI18n from "./config/lang.js";
import routes from "./routes.js";
import errorHandler from "./middleware/error.middleware.js";

/**
 * Initializes the server and its configurations.
 */
initI18n().then(({ i18next, middleware, langNames, supportedLngs }) => {
  const app = express();
  const PORT = process.env.API_PORT || 5000;

  // Middleware setup
  app.use(cors());
  app.use(helmet());
  app.use(middleware.handle(i18next));
  app.use(express.json());
  app.use("/", routes);
  app.use(errorHandler);

  /**
   * Establishes a connection to the database and starts the server.
   */
  pool
    .connect()
    .then(() => {
      app.listen(PORT, () => {
        console.log(i18next.t("server_running", { port: PORT }));
      });
    })
    .catch(err => {
      console.error(i18next.t("database_connection_failed", { error: err.message }));
      process.exit(1);
    });
});