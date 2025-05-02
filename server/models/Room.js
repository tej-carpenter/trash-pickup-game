// server/models/Room.js
class Room {
    constructor(name) {
      this.name = name;
      this.users = new Map(); // Map of socket.id to User objects
    }
    
    getName() {
      return this.name;
    }
    
    addUser(user) {
      this.users.set(user.id, user);
    }
    
    removeUser(userId) {
      this.users.delete(userId);
    }
    
    getUser(userId) {
      return this.users.get(userId);
    }
    
    hasUser(username) {
      for (const user of this.users.values()) {
        if (user.username.toLowerCase() === username.toLowerCase()) {
          return true;
        }
      }
      return false;
    }
    
    getUsersArray() {
      return Array.from(this.users.values()).map(user => ({
        id: user.id,
        username: user.username,
        score: user.score
      }));
    }
    
    getLeaderboard() {
      return this.getUsersArray()
        .sort((a, b) => b.score - a.score);
    }
    
    getTotalScore() {
      let total = 0;
      for (const user of this.users.values()) {
        total += user.score;
      }
      return total;
    }
    
    isEmpty() {
      return this.users.size === 0;
    }
  }
  
  module.exports = Room;