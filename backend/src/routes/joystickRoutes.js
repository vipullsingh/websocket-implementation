const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

// Middleware to authenticate the WebSocket connection before processing joystick data
function authenticateWebSocket(req, res, next) {
  // Get the authorization header from the WebSocket handshake request
  const authHeader = req.headers['authorization'];

  // Check if the authorization header is present
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Extract the token from the "Bearer <token>" format
    const token = authHeader.split(' ')[1];

    // Verify the token using the JWT_SECRET (this should match the secret used to sign the JWT)
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token to the request object for later use in the route handlers
    req.user = decodedToken;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

// Route: GET /api/joystick/status
// Description: Get the status of the joystick
router.get('/status', (req, res) => {
  try {
    // You can add logic here to get and return the current status of the joystick
    const status = { x: 0, y: 0 };
    res.json(status);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: POST /api/joystick/move
// Description: Move the joystick
router.post('/move', authenticateWebSocket, (req, res) => {
  try {
    // You can add logic here to process the joystick data received from the WebSocket
    const { x, y } = req.body;

    // Validate the input data
    if (typeof x !== 'number' || typeof y !== 'number') {
      return res.status(400).json({ error: 'Invalid joystick data' });
    }

    // Process the joystick data here, e.g., update the status in the database
    // For this example, we'll just echo the received data back as the status
    const status = { x, y };
    res.json(status);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more routes as needed for additional functionality related to the joystick

module.exports = router;
