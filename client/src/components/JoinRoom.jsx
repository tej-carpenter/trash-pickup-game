// client/src/components/JoinRoom.jsx
import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';

function JoinRoom() {
  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const { joinRoom, error, connected } = useSocket();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Attempting to join room:', roomName, username);
    
    if (!connected) {
      console.error('Not connected to server');
      setError('Not connected to server. Please try again.');
      return;
    }

    if (roomName.trim() && username.trim()) {
      joinRoom(roomName.trim(), username.trim());
    }
  };

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-2xl font-bold mb-6 text-center">Join a Trash Pickup Room</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Your Username
          </label>
          <input
            type="text"
            id="username"
            className="input w-full"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="roomName" className="block text-gray-700 mb-2">
            Room Name
          </label>
          <input
            type="text"
            id="roomName"
            className="input w-full"
            placeholder="Enter room name or create a new one"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
          <p className="text-gray-500 text-sm mt-1">
            Join an existing room or create a new one by entering a unique name
          </p>
        </div>
        
        <button type="submit" className="btn btn-primary w-full">
          Join Room
        </button>
      </form>
    </div>
  );
}

export default JoinRoom;