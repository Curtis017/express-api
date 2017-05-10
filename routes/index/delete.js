const logger = require('../../components/logger');

module.exports = (req, res, next) => {
    return res.json({
        type: 'delete',
        body: req.body,
        headers: req.headers
    });
}