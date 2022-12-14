const router = require('express').Router();
const pool = require('../utils/db');
const validProduct = require('../middleware/validProduct');

// GET ALL PRODUCTS
// *****************************************************************************************
router.get('/all', async (req, res) => {

  try {
    const results = await pool.query(
      'select products.product_id, products.name, description, price, images.name as image, categories.name as type \
       from products \
       join images \
       on products.product_id = images.product_id \
       join categories \
       on products.category_id = categories.category_id'
      );
    res.send(results.rows);

  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
})

// GET ALL TYPES
// *****************************************************************************************
router.get('/types', async (req, res) => {
  try {
    const results = await pool.query('select name from categories');
    res.send(results.rows);
    
  } catch (err) {
    console.log(err.message);
  }
})

// GET ALL PRODUCTS OF TYPE :TYPE
// *****************************************************************************************
router.get('/:type', async (req, res) => {

  // This route is hit when a client wants all the products of a certain type.
  // It uses a variable route. This function queries the products table in the
  // database for all records where category matches the value of :type

  try {
    const results = await pool.query(
      'select products.product_id, products.name, description, price, categories.name as type, images.name as image \
      from products \
      join categories \
      on products.category_id = categories.category_id \
      join images \
      on products.product_id = images.product_id \
      where categories.name = $1 \
      order by price', [req.params.type]
    )

    res.json(results.rows);

  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
})

// ADD A NEW PRODUCT
// *****************************************************************************************
router.post('/add', validProduct, async (req, res) => {

  // This route is hit when a user with administrative privileges wants to add
  // a new product to the prouducts table in the database. If the product already exists,
  // a status 401 is sent back to the client
  
  try {
    const {name, description, price, category} = req.body;

    // This query should return no results
    const product = await pool.query('select * from products where name = $1', [name]);
    if (product.rows.length !== 0) { return res.status(401).send('Product Already Exists') }

    const results = await pool.query('select category_id from categories where name = $1', [category])
    if (results.rows.length === 0) { return res.status(404).send('Invalid Category') }

    category_id = results.rows[0].category_id;
    
    const newProduct = await pool.query(
      'insert into products(name, description, price, category_id) \
        values($1, $2, $3, $4)', [name, description, parseFloat(price), category_id]
    );

    res.json(true);
    
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
})

module.exports = router;