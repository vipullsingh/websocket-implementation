const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');

// Middleware to authenticate WebSocket connections
const authenticateWebSocket = (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    // Verify the JWT token to authenticate the user
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('WebSocket authentication error:', err);
        return next(new Error('Authentication failed'));
      }

      // If authentication is successful, add the user's information to the socket object
      socket.user = decoded;
      next();
    });
  } catch (error) {
    console.error('WebSocket authentication error:', error);
    return next(new Error('Authentication failed'));
  }
};

module.exports = {
  authenticateWebSocket,
};
