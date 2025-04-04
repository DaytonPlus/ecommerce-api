// setup.ts - Configuración global
import { pool } from '../config/database';

beforeAll(async () => {
  // Crear tablas de prueba
  await pool.query(`
    CREATE TEMPORARY TABLE test_users (LIKE usuarios INCLUDING ALL);
    CREATE TEMPORARY TABLE test_products (LIKE productos INCLUDING ALL);
  `);
});

afterAll(async () => {
  await pool.query(`
    DROP TABLE IF EXISTS test_users;
    DROP TABLE IF EXISTS test_products;
  `);
  await pool.end();
});
