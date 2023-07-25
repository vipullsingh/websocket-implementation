// Error handling middleware
const errorHandler = (err, req, res, next) => {
    // If the error is a known error with a status code, send the appropriate response
    if (err.statusCode) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      // If it's an unknown error, send a generic 500 Internal Server Error response
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    errorHandler,
  };
  