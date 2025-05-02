// client/src/App.jsx
import React from 'react';
import { SocketProvider } from './context/SocketContext';
import Header from './components/Header';
import JoinRoom from './components/JoinRoom';
import Leaderboard from './components/Leaderboard';
import TrashSubmit from './components/TrashSubmit';
import Chat from './components/Chat';
import { useSocket } from './context/SocketContext';

// Main App container that wraps all components
function AppContent() {
  const { currentRoom } = useSocket();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {!currentRoom ? (
          <JoinRoom />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <TrashSubmit />
              <div className="mt-6">
                <Chat />
              </div>
            </div>
            <div className="md:col-span-1">
              <Leaderboard />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <SocketProvider>
      <AppContent />
    </SocketProvider>
  );
}

export default App;