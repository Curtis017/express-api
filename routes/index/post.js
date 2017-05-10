const logger = require('../../components/logger');

module.exports = (req, res, next) => {
  let headers = req.headers;
  let body = req.body;

  return res.status(201).json({ 
    type: 'post',
    body: body,
    headers: headers
  });
};