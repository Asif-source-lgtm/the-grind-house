const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// ── Middleware ──
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : '*',
  credentials: true,
}));
app.use(express.json());

// Request logger (debug)
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.originalUrl}`);
  next();
});

// ── Routes ──
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/workouts', require('./routes/workoutRoutes'));
app.use('/api/trainers', require('./routes/trainerRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🏋️ The Grind House API is running',
    version: '1.0.0',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('💥 Unhandled error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// ── Start Server ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🔥 ══════════════════════════════════════`);
  console.log(`   THE GRIND HOUSE API`);
  console.log(`   Server running on port ${PORT}`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`🔥 ══════════════════════════════════════\n`);
});
