const express = require('express');
const router = express.Router();
const { addWorkout, getWorkouts, deleteWorkout } = require('../controllers/workoutController');
const { protect } = require('../middleware/authMiddleware');

// All workout routes are protected
router.use(protect);

router.route('/')
  .post(addWorkout)
  .get(getWorkouts);

router.route('/:id')
  .delete(deleteWorkout);

module.exports = router;
