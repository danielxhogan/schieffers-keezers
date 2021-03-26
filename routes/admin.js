const router = require('express').Router();
const authorization = require('../middleware/authorization');

// ADMIN CHECK
// *****************************************************************************************
router.get('/check', authorization, async (req, res) => {

  // This route is hit when the client wants to know if the user that is currently
  // logged in is the admin. It gets the user_id of the user from the request token
  // and checks if its equal to the value stored in the environment variable ADMIN_USER_ID

  try {
    if (req.user_id === process.env.ADMIN_USER_ID) {
      res.json(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
})

module.exports = router;