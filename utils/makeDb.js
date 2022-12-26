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


  // MAKE TABLES
// *****************************************************************************************
  pool.query('create table if not exists users(\
    user_id serial primary key,\
    first_name text,\
    last_name text,\
    email text,\
    password text\
    )');

  pool.query('create table if not exists addresses(\
    address_id serial primary key,\
    street text,\
    city text,\
    state text,\
    zip int,\
    user_id int references users(user_id)\
    )');


  pool.query('create table if not exists categories(\
    category_id serial primary key,\
    name text\
  )');

  pool.query('create table if not exists products(\
    product_id serial primary key,\
    name text,\
    description text,\
    price numeric,\
    category_id int references categories(category_id)\
  )');

  pool.query('create table if not exists images(\
    image_id serial primary key,\
    name text,\
    product_id int references products(product_id)\
    )');


  pool.query('create table if not exists cart(\
    cart_item_id serial primary key,\
    user_id int references users(user_id),\
    product_id int references products(product_id),\
    qty int\
    )');

// INSERT PRODUCT DATA
// *****************************************************************************************
pool.query('insert into categories(name) values("freezer")');
pool.query('insert into categories(name) values("tapkit")');
pool.query('insert into categories(name) values("drippan")');
pool.query('insert into categories(name) values("thermostat")');
pool.query('insert into categories(name) values("c02tank")');

  pool.end();

} catch (err) {
  console.log(err.message);
}