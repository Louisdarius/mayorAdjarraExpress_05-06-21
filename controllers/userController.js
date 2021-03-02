const User = require('../models/userModel');

/**
 * Gett all users controller
 */
async function getAllUsers(req, res, next) {
  try {
    const users = await User.find().populate('role');
    res.json(users);
  } catch (error) {
    next(error);
  }
}

/**
 * Get a specific user controller
 */
async function getEachUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id).populate('role');
    res.json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * Get a user profile controller
 */
async function getUserProfile(req, res, next) {
  try {
    const user = req.user;
    await user.populate('role').execPopulate();
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
}

/**
 * Add a user controller
 */
async function addUser(req, res, next) {
  const newUser = new User(req.body);
  try {
    const user = await newUser.save();
    const token = await user.generateAuthToken();
    await user.populate('role').execPopulate();
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
}

/**
 * Login user controller
 */
async function login(req, res, next) {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    await user.populate('role').execPopulate();
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
}

/**
 * Logout a user controller
 */
async function logout(req, res, next) {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    next(error);
  }
}

/**
 * Logout from all devices user controller
 */
async function logoutAll(req, res, next) {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    next(error);
  }
}

/**
 * Update a user controller
 */
async function updateUserProfile(req, res, next) {
  const updateUser = req.user;
  (updateUser.firstName = req.body.firstName),
    (updateUser.lastName = req.body.lastName),
    (updateUser.email = req.body.email),
    (updateUser.tel = req.body.tel),
    (updateUser.password = req.body.password),
    (updateUser.role = req.body.role);
  try {
    const user = await updateUser.save();
    await user.populate('role').execPopulate();
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  const updateUser = await User.findById(req.params.id);
  (updateUser.firstName = req.body.firstName),
    (updateUser.lastName = req.body.lastName),
    (updateUser.email = req.body.email),
    (updateUser.tel = req.body.tel),
    (updateUser.password = req.body.password),
    (updateUser.role = req.body.role);
  try {
    const user = await updateUser.save();
    await user.populate('role').execPopulate();
    res.json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a user profile controller
 */
async function deleteUserProfile(req, res, next) {
  try {
    const user = req.user;
    const fullName = `${user.firstName} ${user.lastName} has been deleted`;
    res.json(fullName);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a user controller
 */
async function deleteUser(req, res, next) {
  try {
    const deleteUser = await User.findById(req.params.id);
    const user = deleteUser.remove();
    const fullName = `${user.firstName} ${user.lastName} has been deleted`;
    res.json(fullName);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUsers,
  getEachUser,
  addUser,
  updateUser,
  deleteUser,
  login,
  getUserProfile,
  logout,
  logoutAll,
  deleteUserProfile,
  updateUserProfile,
};
