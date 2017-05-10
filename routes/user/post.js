const User = require('../../models/user');
const logger = require('../../components/logger');
const token = require('../../components/token');

module.exports = (req, res, next) => {
  let email = req.headers['email'];
  let password = req.headers['password'];
  let firstname = req.headers['firstname'];
  let lastname = req.headers['lastname'];

  let user = new User({ // User model handles invalid field input
    email: email,
    firstname: firstname,
    lastname: lastname,
    password: password
  });

  user.save() // Create user
    .then((user) => { // Create token
      logger.info('User Creation Successful: User[' + user.email + '] created!');
      return token(user);
    })
    .then((token) => { // Respond to user
      logger.info('Registration Successful: User[' + user.email + '] created and logged in!');
      return res.status(201).json({
        success: true,
        message: 'Registration Successful',
        user: token.decoded.payload,
        token: token.encoded
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        logger.info('Registration Failed: User[' + email + '] ' + err);
        return res.status(400).json({
          success: false,
          user: false,
          message: 'Registration Failed',
          token: false
        });
      } else if (err.code === 11000) { // Duplicate key error
        logger.info('Registration Failed: User[' + email + '] ' + err.errmsg);
        return res.status(409).json({
          success: false,
          user: false,
          message: 'Registration Failed',
          token: false
        });
      } else {
        logger.info('Registration Failed: User[' + email + '] created, but not logged in. ');
        return res.status(500).json({
          success: false,
          user: user.payload,
          message: 'Registration Failed',
          token: false
        });
      }
    });

};