// Configuration settings for the WebSocket API
const config = {
    webSocket: {
      port: process.env.WS_PORT || 5000, // Port for the WebSocket server
      origins: process.env.WS_ORIGINS || '*', // Allowed origins for WebSocket connections (e.g., "http://localhost:3000" or "*" for all origins)
      allowCors: process.env.WS_ALLOW_CORS || true, // Enable CORS for WebSocket connections
    },
    restful: {
      apiPrefix: '/api', // Prefix for RESTful API routes
    },
  };
  
  module.exports = config;
  