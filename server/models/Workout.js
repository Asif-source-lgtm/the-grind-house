const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  exerciseName: {
    type: String,
    required: [true, 'Exercise name is required'],
    trim: true,
  },
  sets: {
    type: Number,
    required: [true, 'Number of sets is required'],
    min: 1,
  },
  reps: {
    type: Number,
    required: [true, 'Number of reps is required'],
    min: 1,
  },
  caloriesBurned: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Workout', workoutSchema);
