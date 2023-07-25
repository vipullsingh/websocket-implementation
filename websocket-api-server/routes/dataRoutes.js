const express = require('express');
const router = express.Router();
const { getData } = require('../controllers/dataController');

// GET /data - Data retrieval endpoint
router.get('/', (req, res, next) => {
  try {
    // Get data using the getData function
    const data = getData();

    // Respond with the data as JSON
    res.status(200).json(data);
  } catch (error) {
    // If there's an error, pass it to the error handling middleware
    next(error);
  }
});

module.exports = router;
