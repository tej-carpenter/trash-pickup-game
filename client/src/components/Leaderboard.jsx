// client/src/components/Leaderboard.jsx
import React from 'react';
import { useSocket } from '../context/SocketContext';

function Leaderboard() {
  const { leaderboard, totalScore } = useSocket();

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Leaderboard</h2>
        <div className="text-sm bg-primary text-white px-3 py-1 rounded-full">
          Total: {totalScore} points
        </div>
      </div>
      
      {leaderboard.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No participants yet
        </p>
      ) : (
        <div className="space-y-2">
          {leaderboard.map((user, index) => (
            <div 
              key={user.id} 
              className={`flex justify-between items-center p-3 rounded-md ${
                index === 0 ? 'bg-yellow-100' : 'bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <span className="font-medium w-8 text-center">{index + 1}</span>
                <span className="font-medium">{user.username}</span>
              </div>
              <span className="font-bold">{user.score} pts</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;