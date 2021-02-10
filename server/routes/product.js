const router = require('express').Router();
const pool = require('../db');

// GET ALL PRODUCTS
// *****************************************************************************************
router.get('/all', async (req, res) => {

  try {
    console.log('here');
    const results = await pool.query('select * from products');
    res.send(results.rows);

  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
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
      'select products.name, description, price, categories.name as type \
      from products \
      join categories \
      on products.category_id = categories.category_id \
      where categories.name = $1', [req.params.type]
    )

    res.json(results.rows);

  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
})

module.exports = router;