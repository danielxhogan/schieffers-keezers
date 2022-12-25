require('dotenv').config()
const Pool = require('pg').Pool;

try {
  const pool = new Pool({
    user: 'postgres',
    password: process.env.PG_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'sk'
  });


  pool.query('create table if not exists users(\
    user_id int primary key\
    first_name text\
    last_name text\
    email text\
    password text\
    )');

  pool.query('create table if not exists addresses(\
    address_id int primary key\
    street text\
    city text\
    state text\
    zip int\
    user_id int references users(user_id)\
    )');


  pool.query('create table if not exists categories(\
    category_id int primary key\
    name text\
  )');

  pool.query('create table if not exists products(\
    product_id int primary key\
    name text\
    description text\
    price numeric\
    category_id int references categories(category_id)\
  )');

  pool.query('create table if not exists images(\
    image_id int primary key\
    name text\
    product_id int references products(product_id)\
    )');


  pool.query('create table if not exists cart(\
    cart_item_id int primary key\
    user_id int refrences users(user_id)\
    product_id int references products(product_id)\
    qty\
    )');

  pool.end();

} catch (err) {
  console.log(err.message);
}