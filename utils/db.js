require('dotenv').config()

const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'COLExBURNED#363',
  host: 'database-2.c7stlrulp8px.us-east-1.rds.amazonaws.com',
  port: 5432,
  database: 'sk'
});

module.exports = pool;