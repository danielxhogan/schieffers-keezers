module.exports = (req, res, next) => {

  // This middleware script is used when a client attempts to login or register.
  // it checks the body of the request to make sure all the fields are entered.
  // Then it checks that the regex pattern of the emial entry is a valid pattern.

  const {first_name, last_name, email, password} = req.body;

  function validEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  if (!validEmail(email)) { return res.status(400).json('invalid email'); }

  if (req.path === '/register') {
    if (![first_name, last_name, email, password].every(Boolean)) {
      return res.status(400).json('missing fields');
    }
  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.status(400).json('missing fields');
    }
  }
  next();
};