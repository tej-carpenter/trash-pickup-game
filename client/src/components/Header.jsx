// client/src/components/Header.jsx
import React from 'react';
import { useSocket } from '../context/SocketContext';

function Header() {
  const { currentRoom, username, totalScore } = useSocket();

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-2 md:mb-0">
            <h1 className="text-2xl font-bold">🌍 Trash Pickup Game</h1>
          </div>
          
          {currentRoom && (
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <div className="text-sm md:text-base">
                <span className="font-semibold">Room:</span> {currentRoom}
              </div>
              <div className="text-sm md:text-base">
                <span className="font-semibold">Username:</span> {username}
              </div>
              <div className="bg-green-600 px-4 py-1 rounded-full text-sm md:text-base">
                <span className="font-semibold">Total Score:</span> {totalScore}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;