const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * New Auth Middleware
 * Checks for valid Auth JWT in Authorization header
 */
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'thisisissjshshshshshshshsgssik');
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
