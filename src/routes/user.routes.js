const express = require('express');
const { getProfile, updateProfile } = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/me', authMiddleware, getProfile);
router.put('/me', authMiddleware, updateProfile);

module.exports = router;
