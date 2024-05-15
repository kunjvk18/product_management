const User = require('../models/User');

const updateUserService = async (userId, updatedUserData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, { updatedUserData }, { new: true });
    return user;
  } catch (error) {
    throw new Error('Error updating profile');
  }
};

const getUserById = async (userId) => {
  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    // If user is not found, throw an error
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw new Error('Error fetching user');
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find({}, '-password'); // Excluding the 'password' field from the query result
    return users;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};


module.exports = {
  updateUserService,
  getUserById,
  getAllUsers
};
