const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { errorHandler } = require('./utils/errorHandler');
const { authRoutes, configRoutes, dataRoutes } = require('./routes');
const { handleWebSocketConnection } = require('./controllers/joystickController');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// WebSocket connections handling
io.on('connection', handleWebSocketConnection);

// Middleware
app.use(express.json());

// RESTful endpoints
app.use('/auth', authRoutes);
app.use('/config', configRoutes);
app.use('/data', dataRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`WebSocket API server running on port ${PORT}`);
});
