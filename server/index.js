// server/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const Room = require('./models/Room');
const User = require('./models/User');

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Configure CORS
app.use(cors());

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
    transports: ['websocket', 'polling']
  }
});

// In-memory store for rooms
const rooms = new Map();

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // Join or create room
  socket.on('join_room', ({ username, roomName }) => {
    console.log(`Attempt to join room: ${roomName} by user: ${username}`);
    
    // Check if room exists, if not create it
    if (!rooms.has(roomName)) {
      rooms.set(roomName, new Room(roomName));
    }
    
    const room = rooms.get(roomName);
    
    // Check if username is available in the room
    if (room.hasUser(username)) {
      socket.emit('join_error', { error: 'Username is already taken in this room' });
      return;
    }
    
    // Add user to room
    const user = new User(socket.id, username);
    room.addUser(user);
    
    // Join the socket.io room
    socket.join(roomName);
    
    // Send current room state to the new user
    socket.emit('room_joined', {
      room: room.getName(),
      users: room.getUsersArray(),
      leaderboard: room.getLeaderboard(),
      totalScore: room.getTotalScore()
    });
    
    // Notify all users in the room about the new user
    io.to(roomName).emit('user_joined', { username });
    io.to(roomName).emit('chat_message', { 
      username: 'System', 
      message: `${username} joined the room` 
    });
    
    // Update the leaderboard for all users
    io.to(roomName).emit('leaderboard_update', {
      leaderboard: room.getLeaderboard(),
      totalScore: room.getTotalScore()
    });
    
    // Store room name in socket for reference on disconnect
    socket.data.roomName = roomName;
    socket.data.username = username;

    console.log(`User ${username} successfully joined room ${roomName}`);
  });
  
  // Handle trash submission
  socket.on('submit_trash', ({ trashType, quantity }) => {
    const { roomName, username } = socket.data;
    if (!roomName || !username) return;
    
    const room = rooms.get(roomName);
    if (!room) return;
    
    // Define point values for different trash types
    const trashPoints = {
      'plastic': 10,
      'paper': 5,
      'glass': 15,
      'metal': 20,
      'organic': 5,
      'electronic': 50
    };
    
    // Calculate points based on trash type
    const pointsPerItem = trashPoints[trashType] || 10; // Default to 10 if type not found
    const points = quantity * pointsPerItem;
    
    // Update user's score
    const user = room.getUser(socket.id);
    if (user) {
      user.addScore(points);
      
      // Emit submission event to all users in the room
      io.to(roomName).emit('trash_submitted', {
        username,
        trashType,
        quantity,
        points,
        pointsPerItem // Added to show points per item in notifications
      });
      
      // Update the leaderboard
      io.to(roomName).emit('leaderboard_update', {
        leaderboard: room.getLeaderboard(),
        totalScore: room.getTotalScore()
      });
    }
  });
  
  // Handle chat messages
  socket.on('send_message', (message) => {
    const { roomName, username } = socket.data;
    if (!roomName || !username) return;
    
    io.to(roomName).emit('chat_message', {
      username,
      message
    });
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    
    const { roomName, username } = socket.data;
    if (!roomName) return;
    
    const room = rooms.get(roomName);
    if (!room) return;
    
    // Remove user from room
    room.removeUser(socket.id);
    
    // Notify all users in the room
    if (username) {
      io.to(roomName).emit('user_left', { username });
      io.to(roomName).emit('chat_message', { 
        username: 'System', 
        message: `${username} left the room` 
      });
    }
    
    // Update the leaderboard
    io.to(roomName).emit('leaderboard_update', {
      leaderboard: room.getLeaderboard(),
      totalScore: room.getTotalScore()
    });
    
    // If room is empty, delete it
    if (room.isEmpty()) {
      rooms.delete(roomName);
      console.log(`Room ${roomName} deleted (empty)`);
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});