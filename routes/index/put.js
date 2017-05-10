const logger = require('../../components/logger');

module.exports = (req, res, next) => {
    return res.json({
        type: 'put',
        body: req.body,
        headers: req.headers
    });
}