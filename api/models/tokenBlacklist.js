const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({

  token: { type: String, required: true, unique: true },
  
});

const TokenBlacklist = mongoose.model('TokenBlacklist', tokenBlacklistSchema);

module.exports = TokenBlacklist;