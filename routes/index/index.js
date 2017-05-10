const express = require('express');
const router = express.Router();

// Create
router.post('/', require('./post'));

// Read
router.get('/', require('./get'));

// Update
router.put('/', require('./put'));

// Delete
router.delete('/', require('./delete'));

module.exports = router;