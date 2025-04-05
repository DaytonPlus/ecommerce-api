import pg from 'pg';

const pool = new pg.Pool({
  user: 'test',
  host: '127.0.0.1',
  database: 'ecommerce',
  password: 'test',
  port: '5432',
});

pool.connect().then(() => {
  console.log("Connection to database successfully!");
  process.exit(1);
}).catch((err) => {
  console.error(error);
  process.exit(1);
});