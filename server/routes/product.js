const router = require('express').Router();
const pool = require('../db');

router.get('/all', async (req, res) => {

  try {
    console.log('here');
    const allProducts = await pool.query('select * from products');
    res.json(allProducts);




  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }




})

module.exports = router;