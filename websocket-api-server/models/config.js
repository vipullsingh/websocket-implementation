const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  setting1: { type: Boolean, default: true },
  setting2: { type: String, default: 'value2' },
  setting3: { type: Number, default: 123 },
});

const Config = mongoose.model('Config', configSchema);

module.exports = Config;
