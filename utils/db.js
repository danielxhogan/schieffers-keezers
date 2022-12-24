require('dotenv').config()
const Pool = require('pg').Pool;

try {
  const pool = new Pool({
    user: 'root',
    password: process.env.PG_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'sk'
  });

  module.exports = pool;

} catch (err) {
  console.log(err.message);
}