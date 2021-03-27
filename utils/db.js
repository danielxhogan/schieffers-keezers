require('dotenv').config()

const Pool = require('pg').Pool;

const devConfig = {
  user: 'rando_mane',
  password: 'COLExBURNED#363',
  host: 'localhost',
  port: 5432,
  database: 'sk'
};

const proConfig = {
  connectionString: process.env.DATABASE_URL
};

const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig);

module.exports = pool;