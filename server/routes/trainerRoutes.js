const express = require('express');
const router = express.Router();
const { getTrainers, getTrainerSlots, createBooking, getBookings } = require('../controllers/trainerController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getTrainers);
router.get('/:id/slots', getTrainerSlots);

// Bookings
router.post('/bookings', createBooking);
router.get('/bookings', getBookings);

module.exports = router;
