import express from "express";
import cors from "cors";
import helmet from "helmet";
import { pool } from "./config/database.js";
import initI18n from "./config/lang.js";
import routes from "./routes.js";
import errorHandler from "./middleware/error.middleware.js";


const startServer = async (debug = false) => {
  try {
    const { i18next, middleware } = await initI18n();

    const app = express();
    const PORT = process.env.API_PORT || 5000;

    // Middleware setup
    app.use(cors());
    app.use(helmet());
    app.use(middleware.handle(i18next));
    app.use(express.json());
    app.use("/", routes);
    app.use(errorHandler);

    // Connect to the database and start the server
    await pool.connect();
    
    app.listen(PORT, () => {
      if (!debug) {
        console.log(i18next.t("server_running", { port: PORT }));
      }
    });
    
    return app;
  } catch (err) {
    console.error("Error starting server:", err.message);
    process.exit(1);
  }
  return null;
};

export default startServer;
