const express = require('express');
const router = express.Router();

// Create
router.post('/', (req, res, next) => {
    res.json({ user: req.body.name });
});

// Read
router.get('/:photoId', (req, res, next) => {
  // get aws token to access s3 bucket object.
    res.json({ params: req.params });
});

// Update
router.put('/:photoId', (req, res, next) => {
    res.json({ user: req.body.name });
});

// Delete
router.delete('/:photoId', (req, res, next) => {
    res.json({ params: req.params });
});

module.exports = router;
