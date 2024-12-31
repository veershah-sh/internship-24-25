const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  farmer_name: { type: String, required: true },
  farmer_email: { type: String, required: true, unique: true },
  farmer_phone: { type: String, required: true },
  survey_number: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
