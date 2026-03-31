const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false, // never return password in queries by default
  },
  goal: {
    type: String,
    enum: ['weight loss', 'muscle gain', 'endurance', 'general fitness'],
    default: 'general fitness',
  },
  phone: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  membership: {
    plan: { type: String, default: 'Yearly Commitment' },
    type: { type: String, default: 'Elite PRO' },
    price: { type: Number, default: 12000 },
    cycle: { type: String, default: 'yearly' },
    status: { type: String, default: 'Active' },
    renewalDate: { type: String, default: '2027-01-15' },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
