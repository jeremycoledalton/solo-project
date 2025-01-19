const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    cookieId: { type: String, required: true, unique: true },
    createdAt: { type: Date, expires: 900, default: Date.now }
  });

const Sessions = mongoose.model('Session', sessionSchema);
  
module.exports = { Sessions };