import User from '../models/User.js';

// get all userSelect: 
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.json(users);
  } catch (error) {
  res.status(500).json({error: error.message});
  }
};

// get user by ID
export const getUserById = async (req, res) => {

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create new user
export const createUser = async (req, res) => {
  try {
    const { name, email, role, isVerified } = req.body;
    const newUser = new User({ name, email, role, isVerified });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update user by ID
export const updateUserById = async (req, res) => {
  try {
    const { name, email, role, isVerified } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, isVerified },
      { new: true, }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete user by ID
export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
