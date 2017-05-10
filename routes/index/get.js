const logger = require('../../components/logger');

module.exports = (req, res, next) => {
  let email = req.headers['email'];
  let password = req.body['password'];

  return res.status(200).json({
    type: 'get',
    body: req.body,
    headers: req.headers
  });
}