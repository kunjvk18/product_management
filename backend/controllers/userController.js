const User = require('../models/User');
const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const updatedUserData = req.body;

        // Check if user already exists
        if (updatedUserData && updatedUserData.email) {
            const existingUser = await User.findOne({ email: updatedUserData.email });
            if (existingUser) {
                throw new Error('User already exists with this email');
            }
        }

        const updatedUser = await userService.updateUserService(userId, updatedUserData);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserProfile,
    updateUserProfile,
};