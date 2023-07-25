const express = require('express');
const router = express.Router();
const { getConfig, updateConfig } = require('../controllers/configController');

// GET /config - Get configuration settings endpoint
router.get('/', (req, res, next) => {
  try {
    // Get configuration settings using the getConfig function
    const config = getConfig();

    // Respond with the configuration settings as JSON
    res.status(200).json(config);
  } catch (error) {
    // If there's an error, pass it to the error handling middleware
    next(error);
  }
});

// PUT /config - Update configuration settings endpoint
router.put('/', (req, res, next) => {
  try {
    const newConfig = req.body;

    // Update configuration settings using the updateConfig function
    updateConfig(newConfig);

    // Respond with a success message
    res.status(200).json({ message: 'Configuration settings updated successfully!' });
  } catch (error) {
    // If there's an error, pass it to the error handling middleware
    next(error);
  }
});

module.exports = router;
