const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('./constants');

// Function to generate JWT token
const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Function to hash the password using bcrypt
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

// Function to compare the provided password with the hashed password
const comparePassword = async (password, hashedPassword) => {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  return isPasswordValid;
};

module.exports = {
  generateToken,
  hashPassword,
  comparePassword,
};
