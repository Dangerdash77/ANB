const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // or email
  password: { type: String, required: true },
  role: { type: String, default: 'user' }  // ✅ default to 'user'
});

module.exports = mongoose.model('User', userSchema);
