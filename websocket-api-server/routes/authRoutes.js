const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');

// POST /auth/login - User login endpoint
router.post('/login', (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Perform user login logic, validate credentials, and generate a JWT token
    const token = login(username, password);

    // Send the JWT token as a response
    res.status(200).json({ token });
  } catch (error) {
    // If there's an error, pass it to the error handling middleware
    next(error);
  }
});

// POST /auth/register - User registration endpoint
router.post('/register', (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Perform user registration logic, create a new user in the database, etc.
    register(username, password);

    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    // If there's an error, pass it to the error handling middleware
    next(error);
  }
});

module.exports = router;
