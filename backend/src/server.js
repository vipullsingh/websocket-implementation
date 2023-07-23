const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose'); // Add Mongoose
const { handleWebSocketConnection } = require('./controllers/joystickController');
const authRoutes = require('./routes/authRoutes');
const joystickRoutes = require('./routes/joystickRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Configure Mongoose and connect to the MongoDB database
mongoose
  .connect('mongodb+srv://vipulkrvks:vipulkrsingh@cluster0.q6qgros.mongodb.net/WebSocket?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB database');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB database:', err);
  });

// Set up WebSocket API endpoint
io.on('connection', handleWebSocketConnection);

// Routes
app.use('/api/auth', authRoutes); // Routes for user authentication
app.use('/api/joystick', joystickRoutes); // Routes for joystick data and other functionality

// Add any other routes here for additional RESTful endpoints

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`WebSocket API server is running on port ${PORT}`);
});
