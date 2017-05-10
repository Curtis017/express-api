const jwt = require('jsonwebtoken');
const logger = require('../components/logger');

module.exports = (req, res, next) => {

  // check body, header, or url parameters for token
  let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, req.app.get('jwtSecret'), (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {
    // if there is no token
    // redirect to login page
    return res.status(302).json({
        success: false,
        message: 'No token provided.'
    });

  }
};
