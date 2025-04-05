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
      try {
        await pool.query(`TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`);
        console.log(`Table ${tableName} truncated successfully.`);
      } catch (error) {
        if (error.code === '42P01') {
          console.log(`Table ${tableName} does not exist.`);
        } else {
          console.error(`Error truncating table ${tableName}:`, error);
        }
      }
    }
    
    console.log("Database reset process completed.");
    process.exit(0);
  } catch (error) {
    console.error("General error resetting database:", error);
    process.exit(1);
  }
})();