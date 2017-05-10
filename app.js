const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // http request logger
const config = require('./config');
const logger = require('./components/logger'); // logging (error, warn, info, verbose)
const database = require('./components/database');
const authenticate = require('./middleware/authenticate');

// Set JSONWebToken secret
app.set('jwtSecret', config.jwtSecret);

// Middleware
app.use(morgan(config.morgan[process.env.NODE_ENV], {stream: logger.stream}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routing
app.use('/user', require('./routes/user/')); // index.js
app.use('/photo', authenticate, require('./routes/photo/')); // index.js

// 404 - forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: (app.get('env') === 'production') ? {} : err
    });
  });

module.exports = app;
