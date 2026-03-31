const express = require('express');
const router = express.Router();
const { updateProfile, changePassword, getMembership } = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.put('/profile', updateProfile);
router.put('/password', changePassword);
router.get('/membership', getMembership);

module.exports = router;
