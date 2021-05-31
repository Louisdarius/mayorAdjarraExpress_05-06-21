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
      status: 'actif',
    });

    if (!user) {
      return res.status(404).json({ userNotFund: 'User not found' });
      //throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    return res.status(404).json({ tokenError: 'Token error' });
    //next(error);
  }
};

module.exports = auth;
