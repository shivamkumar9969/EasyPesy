// userController.js

const User = require('../modules/User');
const Property = require('../modules/Property');

// Controller function to fetch user details
const getUserProfile = async (req, res) => {
  try {
    // Assume you have some way to identify the user, such as from the JWT token
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to fetch user properties
const getUserProperties = async (req, res) => {
  try {
    // Assume you have some way to identify the user, such as from the JWT token
    const userId = req.user.id;
    const properties = await Property.find({ owner: userId });
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching user properties:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getUserProfile,
  getUserProperties,
};
