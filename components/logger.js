var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            name: 'info',
            level: 'info',
            filename: './logs/info.json.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.File({
            name: 'error',
            level: 'error',
            filename: './logs/error.json.log',
            handleExceptions: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            json: true,
            colorize: false
        }),
        new winston.transports.Console({
            name: 'console',
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

// Don't log if testing
module.exports = (process.env.NODE_ENV !== 'test') ? logger : new winston.Logger({ transports: [] });
module.exports.stream = (process.env.NODE_ENV !== 'test') ?
{ write: (message, encoding) => { logger.info(message.trim()); } } : 
{ write: (message, encoding) => {} };