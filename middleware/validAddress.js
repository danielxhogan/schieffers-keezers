module.exports = (req, res, next) => {

  // This middleware script is used when a client attempts to add or update their address.
  // it checks the body of the request to make sure all the fields are entered.
  
  const {street, city, state, zip} = req.body;

    if (![street, city, state, zip].every(Boolean)) {
      return res.status(400).json('missing fields');
    }
  next();
};