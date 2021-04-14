const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const validator = require('validator');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'johnsoncaregroup@gmail.com',
    pass: 'johnsoncaregroup@2020',
  },
});

/**
 * Get all users controller
 */
async function getAllUsers(req, res, next) {
  try {
    const PER_PAGE = 2;
    const { filter, page = 1 } = req.query;
    // Build DB query
    let query = {};
    if (filter) {
      query = {
        $or: [
          { firstName: new RegExp(filter, 'gi') },
          { lastName: new RegExp(filter, 'gi') },
          { email: new RegExp(filter, 'gi') },
        ],
      };
    }
    const total = await User.countDocuments(query);
    const users = await User.find(query)
      //.limit(PER_PAGE)
      //.skip((page - 1) * PER_PAGE)
      .populate('role');
    res.json({ users, page, perPage: PER_PAGE, total });
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
    const token = req.token;
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
}

async function getImage(req, res, next) {
  try {
    const user = req.user;
    res.set('Content-Type', 'image/png');
    const userLogo = user.userLogo;
    res.json({ userLogo });
  } catch (error) {
    next(error);
  }
}

/**
 * Add a user controller
 */

async function addUser(req, res, next) {
  const newUser = new User(req.body);
  newUser.role = '603d56db678b700b6482baf4';

  try {
    const email = req.body.email;
    const password = req.body.password;
    const confirmEmail = await User.findOne({ email });
    if (!validator.isEmail(email)) {
      return res.status(404).json({ error: 'Email is invalid' });
    }
    if (confirmEmail) {
      return res.status(404).json({ error: 'Email already exist' });
    }
    console.log(password.length);
    if (password.length <= 8) {
      return res
        .status(404)
        .json({ errorPassword: 'Password must be minimum 8 characters' });
    }
    if (password.toLowerCase().includes('password')) {
      return res
        .status(404)
        .json({ errorPassword: 'Password cannot contain "password"' });
    }
    const user = await newUser.save();
    const token = await user.generateAuthToken();
    await user.populate('role').execPopulate();
    res.json({ user, token });
    transporter.sendMail({
      from: 'johnsoncaregroup@gmail.com',
      to: req.body.email,
      subject: 'Send email to Cyrille',
      text: 'These email is from node js application.....',
    });
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
    if (!user) {
      return res
        .status(404)
        .json({ error: 'Your credential does not match to our record' });
    }
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
  try {
    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
    });
    await user.populate('role').execPopulate();
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await user.populate('role').execPopulate();
    res.json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * Upload image controller
 */
async function uploadImage(req, res, next) {
  res.set('Content-Type', 'multipart/form-data');
  req.body.userLogo = req.body.base64;
  //console.log(req.body);

  try {
    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
    });
    await user.populate('role').execPopulate();
    res.json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * Change password controller
 */
async function changeUserPassword(req, res, next) {
  try {
    const password = req.body.password;
    if (password.toLowerCase().includes('password')) {
      return res
        .status(404)
        .json({ error: 'Password cannot contain "password"' });
    }
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function changeUserProfilePassword(req, res, next) {
  try {
    const id = req.body.id;
    const password = req.body.password;
    const userLogin = await User.findOne({ id });

    const isMatch = await bcrypt.compare(
      req.body.oldPassword,
      userLogin.password
    );

    if (password.toLowerCase().includes('password')) {
      return res
        .status(404)
        .json({ errorPassword: 'Password cannot contain "password"' });
    }
    if (!isMatch) {
      return res.status(404).json({ error: 'Wrong password' });
    }

    req.body.password = await bcrypt.hash(req.body.password, 8);
    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
    });
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

async function deleteImage(req, res, next) {
  try {
    const user = req.user;
    res.set('Content-Type', 'image/jpg');
    const userLogo = user.userLogo;
    const companyLogo = user.companyLogo;
    res.json({ userLogo, companyLogo });
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
  deleteImage,
  login,
  getUserProfile,
  logout,
  logoutAll,
  deleteUserProfile,
  updateUserProfile,
  changeUserPassword,
  changeUserProfilePassword,
  getImage,
  uploadImage,
};
