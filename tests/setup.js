import { pool } from '../src/config/database';
import { execSync } from 'child_process';

beforeAll(async () => {
  execSync('npm run db:reset');
  execSync('npm run db:seed');
});

afterAll(async () => {
  await pool.end();
});

afterEach(async () => {
  const tables = ['users', 'products', 'orders', 'order_items', 'categories', 'carts', 'balances', 'cancellation_requests'];
  for (const table of tables) {
    await pool.query(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`);
  }
});
