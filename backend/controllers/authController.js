const User = require('../models/User');
const authService = require('../services/authService');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

         // Check if user already exists
         const existingUser = await User.findOne({ email: email });
         if (existingUser) {
             throw new Error('User already exists');
         }

        // Validate input data
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newUser = await authService.registerUser({ name, email, password, role });
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input data
        if (!email || !password) {data
            return res.status(400).json({ message: 'Missing email or password' });
        }

        const data = await authService.loginUser(email, password);
        res.status(200).json(data);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
};