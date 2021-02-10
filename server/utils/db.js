require('dotenv').config()

const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'rando_mane',
  password: process.env.PG_PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'sk'
})

module.exports = pool;