const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  survey_number: String,
  role: { type: String, enum: ['Farmer', 'Operator'], required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
