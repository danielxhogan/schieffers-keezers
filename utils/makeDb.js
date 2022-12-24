require('dotenv').config()
const Pool = require('pg').Pool;

console.log(process.env.PG_PASSWORD)

try {
  const pool = new Pool({
    user: 'postgres',
    password: process.env.PG_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'sk'
  });

console.log(process.env.PG_PASSWORD)

  pool.query('create table if not exists test_table (first_column text, second_column integer)');

  pool.end();

} catch (err) {
  console.log(err.message);
}