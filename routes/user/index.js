const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate');

// Create - Register
router.post('/', require('./post'));

// Read - Login
router.get('/', require('./get'));

// Update
router.put('/', authenticate, require('./put'));

// Delete
router.delete('/', authenticate, require('./delete'));

module.exports = router;