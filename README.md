# 🌍 Trash Pickup Game

A real-time multiplayer game that encourages environmental awareness by gamifying trash collection. Players can join rooms, submit their trash pickups, chat with other participants, and compete on the leaderboard.

## Features

- **Real-time Multiplayer**: Join or create rooms to play with others
- **Point System**: Different types of trash are worth different points:
  - Plastic: 10 points
  - Paper: 5 points
  - Glass: 15 points
  - Metal: 20 points
  - Organic: 5 points
  - Electronic: 50 points
- **Photo Evidence**: Upload photos of collected trash
- **Live Chat**: Communicate with other players in your room
- **Leaderboard**: Track individual and total room scores
- **Responsive Design**: Works on both desktop and mobile devices

## Technology Stack

### Frontend
- React.js with Vite
- Socket.IO Client
- TailwindCSS
- ESLint

### Backend
- Node.js
- Express.js
- Socket.IO
- CORS

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd trash-pickup-game
```
2. Install dependencies for both client and server:
```bash
# Install client dependencies
cd client
npm install
```

```bash
# Install server dependencies
cd ../server
npm install
```

3. Start the development servers:
```bash
# Start the backend server (from server directory)
node index.js

# Start the frontend server (from client directory)
npm run dev
```

## Project Structure
```bash
trash-pickup-game/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/      # React context providers
│   │   └── assets/       # Static assets
│   └── public/           # Public assets
└── server/               # Backend Node.js server
    ├── models/          # Data models
    └── index.js         # Server entry point
```

## Usage
1. Open the application in your browser
2. Enter a username and room name
3. Start collecting trash in your area
4. Submit your findings with:
    - Type of trash
    - Quantity
    - Photo evidence (optional)
5. Chat with other players and track your progress on the leaderboard

## Acknowledgments
- Built with **React** + **Vite**
- Styled with **TailwindCSS**
- Real-time functionality powered by **Socket.IO**
- Environmental awareness initiative