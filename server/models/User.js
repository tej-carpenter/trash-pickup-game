// server/models/User.js
class User {
    constructor(id, username) {
      this.id = id;
      this.username = username;
      this.score = 0;
    }
    
    addScore(points) {
      this.score += points;
      return this.score;
    }
  }
  
  module.exports = User;