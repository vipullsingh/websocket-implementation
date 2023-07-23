const jwt = require('jsonwebtoken');

// Middleware for user authentication
function authenticateUser(req, res, next) {
  // Get the authorization header from the request
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

module.exports = authenticateUser;
