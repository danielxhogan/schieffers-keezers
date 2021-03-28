require('dotenv').config()

const Pool = require('pg').Pool;

// const devConfig = {
//   user: 'rando_mane',
//   password: process.env.PG_PASSWORD,
//   host: 'localhost',
//   port: 5432,
//   database: 'sk'
// };

const devConfig = {
  user: 'postgres',
  password: 'COLExBURNED#363',
  host: 'database-2.c7stlrulp8px.us-east-1.rds.amazonaws.com',
  port: 5432,
  database: 'sk'
};

const proConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
};

// const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig);
const pool = new Pool(devConfig);

module.exports = pool;