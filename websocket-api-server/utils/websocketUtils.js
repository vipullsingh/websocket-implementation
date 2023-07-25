// WebSocket utility functions
const sendMessage = (socket, data) => {
    try {
      socket.send(JSON.stringify(data));
    } catch (error) {
      console.error('Error while sending message over WebSocket:', error);
    }
  };
  
  module.exports = {
    sendMessage,
  };
  