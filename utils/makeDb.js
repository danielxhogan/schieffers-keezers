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

// INSERT CATEGORIES
// *****************************************************************************************
// pool.query('insert into categories(name) values($1)', ['freezer']);
// pool.query('insert into categories(name) values($1)', ['tapkit']);
// pool.query('insert into categories(name) values($1)', ['drippan']);
// pool.query('insert into categories(name) values($1)', ['thermostat']);
// pool.query('insert into categories(name) values($1)', ['c02tank']);


// INSERT PRODUCT DATA
// *****************************************************************************************
// CHECK THE ID FOR THE CATEGORIES, MAKE SURE FRIDGES HAVE THE CORRECT CATEGORY NUMBER

// pool.query('insert into products(name, description, price, category_id) values($1, $2, $3, $4)',
// ['Small Freezer', '10 sq ft internal volume', 300, 1]);

// pool.query('insert into products(name, description, price, category_id) values($1, $2, $3, $4)',
// ['Medium Freezer', '12 sq ft internal volume', 500, 1]);

// pool.query('insert into products(name, description, price, category_id) values($1, $2, $3, $4)',
// ['Large Freezer', '15 sq ft internal volume', 700, 1]);


// pool.query('insert into products(name, description, price, category_id) values($1, $2, $3, $4)',
// ['Single Tapkit', 'Tapkit for one head', 35, 2]);

// pool.query('insert into products(name, description, price, category_id) values($1, $2, $3, $4)',
// ['Double Tapkit', 'Tapkit for two heads', 60, 2]);

// pool.query('insert into products(name, description, price, category_id) values($1, $2, $3, $4)',
// ['Triple Tapkit', 'Tapkit for three heads', 85, 2]);

// pool.query('insert into products(name, description, price, category_id) values($1, $2, $3, $4)',
// ['Quad Tapkit', 'Tapkit for four heads', 100, 2]);


// pool.query('insert into products(name, description, price, category_id) values($1, $2, $3, $4)',
// ['Small Drippan', '12 in wide drip pan', 15, 3]);

// pool.query('insert into products(name, description, price, category_id) values($1, $2, $3, $4)',
// ['Large Drippan', '18 in wide drip pan', 25, 3]);


// pool.query('insert into products(name, description, price, category_id) values($1, $2, $3, $4)',
// ['External Theromostat', 'Power breaker that monitors the freezer temp', 45, 4]);

// pool.query('insert into products(name, description, price, category_id) values($1, $2, $3, $4)',
// ['Internal Theromostat', 'Installed thermostat for controlling the freezer temp', 80, 4]);


// pool.query('insert into products(name, description, price, category_id) values($1, $2, $3, $4)',
// ['Small C02 Tank', '10 lb c02 tank', 75, 5]);

// pool.query('insert into products(name, description, price, category_id) values($1, $2, $3, $4)',
// ['Large C02 Tank', '15 lb c02 tank', 110, 5]);


// INSERT IMAGE DATA
// *****************************************************************************************
// CHECK THE PRODUCT ID FOR EACT PRODUCT, MAKE SURE THE IMAGE IS ASSIGNED TO CORRECT PRODUCT

// pool.query('insert into images(name, product_id) values($1, $2)',
// ['small-freezer.jpg', 2]);

// pool.query('insert into images(name, product_id) values($1, $2)',
// ['medium-freezer.jpg', 1]);

// pool.query('insert into images(name, product_id) values($1, $2)',
// ['large-freezer.jpg', 3]);


// pool.query('insert into images(name, product_id) values($1, $2)',
// ['single-tap-kit.jpg', 4]);

// pool.query('insert into images(name, product_id) values($1, $2)',
// ['double-tap-kit.jpg', 5]);

// pool.query('insert into images(name, product_id) values($1, $2)',
// ['triple-tap-kit.jpg', 6]);

// pool.query('insert into images(name, product_id) values($1, $2)',
// ['quad-tap-kit.jpg', 7]);


// pool.query('insert into images(name, product_id) values($1, $2)',
// ['external-thermostat.jpg', 14]);

// pool.query('insert into images(name, product_id) values($1, $2)',
// ['internal-thermostat.jpg', 15]);


// pool.query('insert into images(name, product_id) values($1, $2)',
// ['small-drip-pan.jpg', 8]);

// pool.query('insert into images(name, product_id) values($1, $2)',
// ['large-drip-pan.jpg', 13]);


// pool.query('insert into images(name, product_id) values($1, $2)',
// ['small-c02-tank.jpg', 16]);

// pool.query('insert into images(name, product_id) values($1, $2)',
// ['large-c02-tank.jpg', 17]);


  pool.end();

} catch (err) {
  console.log(err.message);
}