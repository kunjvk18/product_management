const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

// Auth routes
router.post('/register', authMiddleware.isAdmin, authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;