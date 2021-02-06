const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createToken');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');


// REGISTER
// *****************************************************************************************
router.post('/register', validInfo, async (req, res) => {

  // This route is hit when a client attempts to register a new account.
  // This route expects an object in the body of the request with four
  // string values called first_name, last_name, email, and password

  try {
    const {first_name, last_name, email, password} = req.body;

    // This query should return no results
    const user = await pool.query('select * from users where email = $1', [email]);
    if (user.rows.length !== 0) { return res.status(401).send('User Already Exists') }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'insert into users(first_name, last_name, email, password) \
       values($1, $2, $3, $4) returning *', [first_name, last_name, email, bcryptPassword]
    );

    const token = createToken(newUser.rows[0].user_id);
    res.json(token);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// LOGIN
// *****************************************************************************************
router.post('/login', validInfo, async (req, res) => {
  try {

  // This route is hit when a client attempts to login.
  // This route expects an object in the body of the request with two
  // string values email and password

  const {email, password} = req.body;

  const user = await pool.query('select * from users where email = $1', [email]);
  if (user.rows.length === 0) { return res.status(401).send('Email or Password is incorrect') }

  const validPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!validPassword) { return res.status(401).send('Email or Password is incorrect') }

  const token = createToken(user.rows[0].user_id);
  res.json(token);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
})

// VERIFY
// *****************************************************************************************
router.get('/verify', authorization, async (req, res) => {

  // This route is hit when the client needs to be authorized.
  // The request is passed through the authorization middleware. If the client
  // is authorized, their user_id is extracted from their token and added the the
  // request object and this route sends it back to the client.

  try {
    res.json(true);
    
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
})


module.exports = router;