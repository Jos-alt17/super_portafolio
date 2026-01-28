const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getProfile);
router.post('/', protect, updateProfile); // Solo el admin puede editar

module.exports = router;