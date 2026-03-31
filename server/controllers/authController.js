const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  try {
    const { name, email, password, goal } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`⚠️  Signup failed: Email ${email} already registered`);
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // Create user (password is hashed via pre-save hook)
    const user = await User.create({ name, email, password, goal });
    const token = generateToken(user._id);

    console.log(`✅ New user registered: ${user.name} (${user.email})`);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        goal: user.goal,
      },
    });
  } catch (error) {
    console.error('❌ Signup error:', error.message);

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }

    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find user and explicitly include password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log(`⚠️  Login failed: No account found for ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Compare passwords
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log(`⚠️  Login failed: Wrong password for ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = generateToken(user._id);
    console.log(`✅ User logged in: ${user.name} (${user.email})`);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        goal: user.goal,
      },
    });
  } catch (error) {
    console.error('❌ Login error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = req.user;
    console.log(`👤 Profile fetched: ${user.name}`);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        goal: user.goal,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('❌ GetMe error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { signup, login, getMe };
