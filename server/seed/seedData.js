require('dotenv').config();
const mongoose = require('mongoose');
const Trainer = require('../models/Trainer');

const trainers = [
  {
    name: 'Marcus Vance',
    specialty: 'Powerlifting / Strength',
    level: 'Master Elite',
    bio: 'Former competitive powerlifter focused on raw strength and perfect biomechanics.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop',
    availableSlots: [
      { date: 'Apr 1', times: ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'] },
      { date: 'Apr 2', times: ['09:00 AM', '02:00 PM', '06:00 PM'] },
      { date: 'Apr 3', times: ['11:30 AM', '04:30 PM'] },
      { date: 'Apr 4', times: ['09:00 AM', '11:30 AM', '02:00 PM'] },
      { date: 'Apr 5', times: ['02:00 PM', '04:30 PM', '06:00 PM'] },
    ],
  },
  {
    name: 'Elena Rostova',
    specialty: 'Athletic Conditioning',
    level: 'Pro',
    bio: 'Elite sprint coach specializing in fast-twitch explosive movements and agility.',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000&auto=format&fit=crop',
    availableSlots: [
      { date: 'Apr 1', times: ['11:30 AM', '04:30 PM', '06:00 PM'] },
      { date: 'Apr 2', times: ['09:00 AM', '11:30 AM'] },
      { date: 'Apr 3', times: ['09:00 AM', '02:00 PM', '04:30 PM', '06:00 PM'] },
      { date: 'Apr 4', times: ['11:30 AM', '06:00 PM'] },
      { date: 'Apr 5', times: ['09:00 AM', '11:30 AM', '02:00 PM'] },
    ],
  },
  {
    name: 'David Chen',
    specialty: 'Hypertrophy / Aesthetics',
    level: 'Senior Coach',
    bio: 'Bodybuilding expert dedicated to muscle isolation and aesthetic sculpting.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
    availableSlots: [
      { date: 'Apr 1', times: ['09:00 AM', '02:00 PM'] },
      { date: 'Apr 2', times: ['09:00 AM', '11:30 AM', '04:30 PM', '06:00 PM'] },
      { date: 'Apr 3', times: ['02:00 PM', '06:00 PM'] },
      { date: 'Apr 4', times: ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'] },
      { date: 'Apr 5', times: ['04:30 PM', '06:00 PM'] },
    ],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Trainer.deleteMany({});
    console.log('🗑️  Cleared existing trainers');

    await Trainer.insertMany(trainers);
    console.log('✅ Seeded 3 trainers successfully');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();
