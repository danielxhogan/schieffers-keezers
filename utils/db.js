require('dotenv').config()

const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: process.env.PG_PASSWORD,
  host: 'database-2.c7stlrulp8px.us-east-1.rds.amazonaws.com',
  port: 5432,
  database: 'sk'
});

module.exports = pool;