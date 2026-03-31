const Workout = require('../models/Workout');

// @desc    Add a new workout
// @route   POST /api/workouts
// @access  Private
const addWorkout = async (req, res) => {
  try {
    const { exerciseName, sets, reps, caloriesBurned, date } = req.body;

    const workout = await Workout.create({
      user: req.user._id,
      exerciseName,
      sets,
      reps,
      caloriesBurned,
      date: date || Date.now(),
    });

    console.log(`🏋️  Workout logged: ${exerciseName} by ${req.user.name}`);

    res.status(201).json({
      success: true,
      workout,
    });
  } catch (error) {
    console.error('❌ Add workout error:', error.message);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }

    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get all workouts for logged-in user
// @route   GET /api/workouts
// @access  Private
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id })
      .sort({ date: -1 }); // newest first

    console.log(`📋 Fetched ${workouts.length} workouts for ${req.user.name}`);

    res.status(200).json({
      success: true,
      count: workouts.length,
      workouts,
    });
  } catch (error) {
    console.error('❌ Get workouts error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found',
      });
    }

    // Ensure user owns this workout
    if (workout.user.toString() !== req.user._id.toString()) {
      console.log(`🚫 Unauthorized delete attempt by ${req.user.name}`);
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this workout',
      });
    }

    await workout.deleteOne();
    console.log(`🗑️  Workout deleted: ${workout.exerciseName} by ${req.user.name}`);

    res.status(200).json({
      success: true,
      message: 'Workout deleted successfully',
    });
  } catch (error) {
    console.error('❌ Delete workout error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { addWorkout, getWorkouts, deleteWorkout };
