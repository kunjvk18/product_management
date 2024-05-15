const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (data) => {
    const { name, email, password, role } = data;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        });
        await user.save();
        delete user.password;
        return user;
    } catch (error) {
        throw new Error('Error creating user');
    }
};

const loginUser = async (email, password) => {
    try {
        let user = await User.findOne({email});
        if (!user) throw new Error('Invalid Email or Password.')
      
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error('Invalid Email or Password.')
      
        const token = jwt.sign({ userId: user._id, role: user.role },
            process.env.JWT_SECRET, { expiresIn: '1h' });
        return {
            token,
            user
        };
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    registerUser,
    loginUser
};
