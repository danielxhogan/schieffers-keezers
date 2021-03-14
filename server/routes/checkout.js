const router = require('express').Router();
const pool = require('../utils/db');
const authorization = require('../middleware/authorization');

// PROCESS CHECKOUT
// *****************************************************************************************
router.get('/checkout', authorization, async (req,res) => {

  // this route is hit when the user clicks the checkout button on the checkout page.
  // It checks to make sure that the user has an address and that their cart is not empty.
  // It checks to see if the user has at least a freezer and a tap kit in their cart.

  try {
    const user_id = req.user_id;

    const address = await pool.query('select * from addresses where user_id = $1', [user_id]);
    if (address.rows.length == 0) { return res.status(401).json('No address found') }

    const userCartItems = await pool.query(
      'select categories.name \
      from cart \
      join users \
      on cart.user_id = users.user_id \
      join products \
      on cart.product_id = products.product_id \
      join categories \
      on products.category_id = categories.category_id \
      where users.user_id = $1',
      [user_id]
    );

    let hasFreezer = false;
    let hasTapKit = false;

    for (let i=0; i<userCartItems.rows.length; i++) {
      if (userCartItems.rows[i].name === 'freezer') {
        hasFreezer = true;
      }
      if (userCartItems.rows[i].name === 'tapkit') {
        hasTapKit = true;
      }
    }

    if (hasFreezer && hasTapKit) {
      res.json('Has necessary components');
    } else {
      res.status(401).json('must choose atleast one freezer and one tapkit');
    }
    
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;