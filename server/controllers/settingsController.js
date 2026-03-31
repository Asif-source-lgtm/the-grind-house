const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Update user profile
// @route   PUT /api/settings/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, bio } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;

    await user.save();
    console.log(`✏️ Profile updated for ${user.name}`);

    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, bio: user.bio },
    });
  } catch (error) {
    console.error('❌ Update profile error:', error.message);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Change password
// @route   PUT /api/settings/password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Both current and new passwords are required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
    }

    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save(); // pre-save hook will hash it
    console.log(`🔐 Password changed for ${user.name}`);

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('❌ Change password error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get membership info
// @route   GET /api/membership
// @access  Private
const getMembership = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      membership: user.membership || {
        plan: 'Yearly Commitment',
        type: 'Elite PRO',
        price: 12000,
        cycle: 'yearly',
        status: 'Active',
        renewalDate: '2027-01-15',
        guestPasses: 'Unlimited',
        ptSessions: 2,
        lockerStatus: 'Active (Premium)',
      },
    });
  } catch (error) {
    console.error('❌ Get membership error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { updateProfile, changePassword, getMembership };
