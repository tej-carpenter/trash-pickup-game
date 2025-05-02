// client/src/context/SocketContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Replace localhost with the actual IP address of your server
    const serverIP = window.location.hostname; // This will get the current IP address
    const socket = io(`http://${serverIP}:3001`, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setError('Failed to connect to server');
    });

    socket.on('connect', () => {
      console.log('Connected to server!');
      setConnected(true);
      setError('');
    });

    setSocket(socket);

    socket.on('disconnect', () => {
      setConnected(false);
      console.log('Disconnected from Socket.IO server');
    });

    socket.on('join_error', ({ error }) => {
      setError(error);
    });

    socket.on('room_joined', ({ room, users, leaderboard, totalScore }) => {
      setCurrentRoom(room);
      setUsers(users);
      setLeaderboard(leaderboard);
      setTotalScore(totalScore);
      setError('');
    });

    socket.on('user_joined', ({ username }) => {
      console.log(`${username} joined the room`);
    });

    socket.on('user_left', ({ username }) => {
      console.log(`${username} left the room`);
    });

    socket.on('leaderboard_update', ({ leaderboard, totalScore }) => {
      setLeaderboard(leaderboard);
      setTotalScore(totalScore);
    });

    socket.on('chat_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('trash_submitted', ({ username, trashType, quantity, points }) => {
      console.log(`${username} submitted ${quantity} ${trashType} for ${points} points`);
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Function to join a room
  const joinRoom = (roomName, username) => {
    if (!socket) return;
    setUsername(username);
    socket.emit('join_room', { roomName, username });
  };

  // Function to send a chat message
  const sendMessage = (message) => {
    if (!socket || !currentRoom) return;
    socket.emit('send_message', message);
  };

  // Function to submit trash
  const submitTrash = (trashType, quantity) => {
    if (!socket || !currentRoom) return;
    socket.emit('submit_trash', { trashType, quantity: parseInt(quantity, 10) });
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        currentRoom,
        username,
        users,
        leaderboard,
        totalScore,
        error,
        messages,
        joinRoom,
        sendMessage,
        submitTrash,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};