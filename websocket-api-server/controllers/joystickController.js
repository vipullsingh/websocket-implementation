const { sendMessage } = require('../utils/websocketUtils');

// Store the active WebSocket connections
const activeConnections = new Set();

// Function to handle WebSocket connections for the joystick data stream
const handleWebSocketConnection = (socket) => {
  console.log('A user connected via WebSocket');

  // Add the socket to the active connections set
  activeConnections.add(socket);

  // Handle incoming messages from the WebSocket client (React application)
  socket.on('message', (data) => {
    console.log('Received data from WebSocket client:', data);

    // Process the received data (if needed) and send any response back
    // For example, you can send data to all connected WebSocket clients
    // broadcastDataToClients(data);

    // Or, you can send data back to the individual WebSocket client
    sendMessage(socket, { message: 'Data received successfully!' });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected via WebSocket');

    // Remove the socket from the active connections set
    activeConnections.delete(socket);
  });
};

// Function to broadcast data to all connected WebSocket clients
const broadcastDataToClients = (data) => {
  activeConnections.forEach((socket) => {
    sendMessage(socket, data);
  });
};

module.exports = {
  handleWebSocketConnection,
  broadcastDataToClients,
};
