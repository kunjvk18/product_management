const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

// User routes
router.get('/', authMiddleware.isAdmin,userController.getAllUsers);
router.get('/profile', authMiddleware.isAuthenticated, userController.getUserProfile);
router.put('/profile', authMiddleware.isAuthenticated, userController.updateUserProfile);

module.exports = router;