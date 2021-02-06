const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

  // This is a middleware script that authorizes a request.
  // It expects a token in the header of the request. If the header contains
  // no token or the token wasn't generated using my secret token, a status 403
  // is sent back to the client and their request will not be fulfilled

  try {
    const token = req.header('token');
    if (!token) { return res.status(403).json('Not Authorized') }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user_id = payload.user_id;
      next();
    } catch (err) {
      console.log(err.message);
      res.status(403).json('Not Authorized')
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
}