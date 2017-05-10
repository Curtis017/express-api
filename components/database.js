const Mongoose = require('mongoose');
const config = require('../config');
const logger = require('./logger');

Mongoose.Promise = global.Promise;
Mongoose.connect(config.database[process.env.NODE_ENV], (err, db) => {
  if (err) {
    logger.error('Connection with database failed: ' + err);
  }
  else {
    logger.verbose('Connection with database succeeded.');
    exports.database = Mongoose;
  }
});
