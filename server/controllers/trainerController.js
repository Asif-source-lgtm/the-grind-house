const Trainer = require('../models/Trainer');
const Booking = require('../models/Booking');

// @desc    Get all trainers (with optional search)
// @route   GET /api/trainers?search=keyword
// @access  Private
const getTrainers = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { specialty: { $regex: search, $options: 'i' } },
        ],
      };
    }
    const trainers = await Trainer.find(query);
    console.log(`🏋️ Fetched ${trainers.length} trainers`);
    res.json({ success: true, trainers });
  } catch (error) {
    console.error('❌ Get trainers error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get a trainer's available slots
// @route   GET /api/trainers/:id/slots
// @access  Private
const getTrainerSlots = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id).select('name availableSlots');
    if (!trainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }
    res.json({ success: true, name: trainer.name, slots: trainer.availableSlots });
  } catch (error) {
    console.error('❌ Get slots error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Book a session with a trainer
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { trainerId, date, time } = req.body;
    if (!trainerId || !date || !time) {
      return res.status(400).json({ success: false, message: 'Trainer, date, and time are required' });
    }

    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }

    const booking = await Booking.create({
      user: req.user._id,
      trainer: trainerId,
      date,
      time,
    });

    const populated = await booking.populate('trainer', 'name specialty image');
    console.log(`📅 Booking confirmed: ${req.user.name} with ${trainer.name} on ${date} @ ${time}`);

    res.status(201).json({ success: true, booking: populated });
  } catch (error) {
    console.error('❌ Create booking error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings
// @access  Private
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('trainer', 'name specialty image')
      .sort({ createdAt: -1 });

    console.log(`📋 Fetched ${bookings.length} bookings for ${req.user.name}`);
    res.json({ success: true, bookings });
  } catch (error) {
    console.error('❌ Get bookings error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getTrainers, getTrainerSlots, createBooking, getBookings };
