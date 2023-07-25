const Config = require('../models/config');

// Function to get configuration settings
const getConfig = async () => {
  try {
    // Fetch the configuration settings from the database
    const config = await Config.findOne({});

    // If config is null, return an empty object (no settings found)
    return config || {};
  } catch (error) {
    // Handle any errors that occur during data retrieval
    console.error('Error while retrieving configuration settings:', error);
    throw new Error('Failed to retrieve configuration settings');
  }
};

// Function to update configuration settings
const updateConfig = async (newConfig) => {
  try {
    // Check if configuration settings already exist in the database
    let existingConfig = await Config.findOne({});

    // If config is null, create a new config object
    if (!existingConfig) {
      existingConfig = new Config({});
    }

    // Update the configuration settings with the newConfig object
    Object.assign(existingConfig, newConfig);

    // Save the updated configuration settings to the database
    await existingConfig.save();
  } catch (error) {
    // Handle any errors that occur during data updating
    console.error('Error while updating configuration settings:', error);
    throw new Error('Failed to update configuration settings');
  }
};

module.exports = {
  getConfig,
  updateConfig,
};
