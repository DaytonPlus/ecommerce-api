import fs from "fs/promises";
import path from "path";
import { pool } from "../src/config/database.js";

(async () => {
  try {
    const migrationsDirectory = path.join(process.cwd(), "scripts", "sql");
    const files = await fs.readdir(migrationsDirectory);
    for (const file of files) {
      if (path.extname(file) === ".sql") {
        const filePath = path.join(migrationsDirectory, file);
        const sql = await fs.readFile(filePath, "utf8");
        await pool.query(sql);
        console.log(`Ejecutada migración: ${file}`);
      }
    }
    console.log("Todas las migraciones ejecutadas con éxito");
  } catch (err) {
    console.error("Error al ejecutar migraciones", err);
  } finally {
    process.exit(1);
  }
})();