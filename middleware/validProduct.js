module.exports = (req, res, next) => {

  // This middleware script is used when an administrator attempts to add a
  // new product to the database. It checks the body of the request to see
  // that all the fields are filled out and that the price only contains two decimals.

  const {name, description, price, category} = req.body;
  if (![name, description, price, category].every(Boolean)) {
    return res.status(400).json('missing fields');
  }

  const priceCheck = price * 100;   // should be a whole number
  const priceString = '' + priceCheck;
  const decimal = priceString.indexOf('.');
  if (decimal !== -1) { return res.status(400).json('Invalid Price') }

  next();
};