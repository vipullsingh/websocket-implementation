const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../utils/constants');
const User = require('../models/user');

// Function to perform user login and generate JWT token
const login = async (username, password) => {
  try {
    // Find the user by username in the database
    const user = await User.findOne({ username });

    // If the user is not found, throw an error
    if (!user) {
      throw new Error('User not found');
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is not valid, throw an error
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token with the user's username as the payload
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

    return token;
  } catch (error) {
    throw error;
  }
};

// Function to perform user registration (create new user)
const register = async (username, password) => {
  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ username });

    // If the user already exists, throw an error
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Hash the password using bcrypt before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the hashed password
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
  register,
};
