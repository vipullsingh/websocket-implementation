import React, { useState } from 'react';
import WebSocketService from '../services/WebSocketService';

const Joystick = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const webSocketService = new WebSocketService();

  // Function to handle joystick movement
  const handleJoystickMove = (e) => {
    // Get the container's width and height to calculate the joystick position
    const containerWidth = e.currentTarget.offsetWidth;
    const containerHeight = e.currentTarget.offsetHeight;

    // Get the mouse coordinates within the container
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    // Calculate the position relative to the center of the joystick
    let x = mouseX - containerWidth / 2;
    let y = mouseY - containerHeight / 2;

    // Calculate the distance from the center of the joystick to the current position
    const distance = Math.sqrt(x ** 2 + y ** 2);

    // Limit the maximum distance from the center to the size of the joystick container
    const maxDistance = Math.min(containerWidth / 2, containerHeight / 2);

    // If the distance exceeds the maximum, set the position to the edge of the container
    if (distance > maxDistance) {
      const angle = Math.atan2(y, x);
      x = Math.cos(angle) * maxDistance;
      y = Math.sin(angle) * maxDistance;
    }

    // Update the position state with the new coordinates
    setPosition({ x, y });

    // Send the joystick data to the WebSocket server
    webSocketService.sendData({ x, y });
  };

  return (
    <div>
      <h2>Joystick Component</h2>
      <div>
        <strong>Position:</strong>
        <span>X: {position.x}</span>
        <span>Y: {position.y}</span>
      </div>
      <div
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '2px solid black',
          position: 'relative',
          cursor: 'pointer',
        }}
        onMouseMove={handleJoystickMove}
        onMouseLeave={() => handleJoystickMove({ nativeEvent: { offsetX: 0, offsetY: 0 } })}
      >
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'red',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Joystick;
