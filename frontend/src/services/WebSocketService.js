import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3001/';

class WebSocketService {
  constructor() {
    this.socket = null;
  }

  // Function to connect to the WebSocket server
  connect() {
    // Check if the socket is already connected
    if (this.socket && this.socket.connected) {
      console.log('WebSocket already connected.');
      return;
    }

    // Create a new WebSocket connection
    this.socket = io(SOCKET_SERVER_URL);

    // Add event listeners for various WebSocket events (optional)
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server.');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server.');
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  }

  // Function to send data to the WebSocket server
  sendData(data) {
    // Check if the socket is connected
    if (!this.socket || !this.socket.connected) {
      console.warn('WebSocket is not connected. Data not sent.');
      return;
    }

    // Replace 'joystickData' with the specific event name used on the WebSocket server
    this.socket.emit('joystickData', data);
  }

  // Function to close the WebSocket connection
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log('WebSocket connection closed.');
    }
  }
}

export default WebSocketService;
