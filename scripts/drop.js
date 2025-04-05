import fs from 'fs';
import path from "path";
import { pool } from "../src/config/database.js";

(async () => {
  try {
    const tablesPath = path.join(process.cwd(), "scripts", "data", "tables.json");
    const tableData = fs.readFileSync(tablesPath, 'utf8');
    const data = JSON.parse(tableData);
    const tableList = data.tables;

    if (!tableList) {
      throw new Error("JSON file does not contain a 'tables' array.");
    }

    for (const tableName of tableList) {
      await pool.query(`DROP TABLE IF EXISTS ${tableName} CASCADE`);
    }

    console.log("Tables deleted successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error deleting tables:", error);
    process.exit(1);
  }
})();