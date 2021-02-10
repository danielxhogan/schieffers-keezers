const router = require('express').Router();
const authorization = require('../middleware/authorization');

// ADMIN CHECK
// *****************************************************************************************
router.get('/check', authorization, async (req, res) => {

  // This route is hit when the client wants to know the user_id of the user
  // currently logged in.

  try {
    if (req.user_id === process.env.ADMIN_USER_ID) {
      res.send(true);
    } else {
      res.send(false);
    }

  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
})

module.exports = router;