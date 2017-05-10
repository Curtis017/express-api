const User = require('../../models/user');
const logger = require('../../components/logger');
const token = require('../../components/token');

module.exports = (req, res, next) => {
  let email = req.headers['email'];
  let password = req.headers['password'];

  if (!email || !password) { // fail if email or password not provided
    logger.info('Login Failed: Email or password not provided.');
    return res.status(401).json({
      success: false,
      message: 'Login failed',
      token: false
    });
  }

  User.findOne({ // search for user
      email: email
    })
    .then((user) => {
      if (!user) { // user does not exist
        throw 'UserNotFoundError';
      } else {
        return user.comparePassword(password);
      }
    })
    .then((user) => { // create jwt
      logger.info('User Authentication Successful: User[' + email + '] verified credentials.');
      return token(user);
    })
    .then((token) => { // return valid token
      logger.info('Login Successful: User[' + email + '] is logged in.');
      return res.status(200).json({
        success: true,
        message: 'Login Successful',
        user: token.decoded.payload,
        token: token.encoded
      });
    })
    .catch((err) => {
      if (err === 'UserNotFoundError') {
        logger.info('Login Failed: User[' + email + '] not found or invalid.');
        return res.status(401).json({
          success: false,
          message: 'Login failed',
          token: false
        });
      } else if (err === 'PasswordValidationError') {
        logger.info('Login Failed: User[' + email + '] password did not match.');
        return res.status(401).json({
          success: false,
          message: 'Login failed',
          token: false
        });
      } else {
        logger.info('Login Failed: User[' + email + '] ' + err);
        return res.status(500).json({
          success: false,
          message: 'Login failed',
          token: false
        });
      }
    });
}