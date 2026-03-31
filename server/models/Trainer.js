const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    default: 'Pro',
  },
  bio: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  availableSlots: [
    {
      date: String,
      times: [String],
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Trainer', trainerSchema);
