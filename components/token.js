const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('./logger');

const secret = config.jwtSecret;
const expiration = { expiresIn: '1h' };

module.exports = (user) => {
    return new Promise((resolve, reject) => {
        try {
            let payload = user.payload;
            let token = jwt.sign(payload, secret, expiration);
            logger.info('Token Creation Successful: User[' + user.email + '] token created successfully!');
            resolve({
                encoded: token,
                decoded: {
                    payload: payload
                }
            });
        } catch (err) {
            logger.info('Token Creation Failed: User[' + user.email + '] token creation failed! ' + err);
            reject(err);
        }
    });
}