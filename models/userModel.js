const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Appointment = require('../models/appointmentModel');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 8,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    tel: {
      type: Number,
      required: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    role: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Role',
    },
  },
  { timestamps: true }
);

/**
 * Method for hidden unnecessary filed
 */
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

/**
 * Authentification token with JWT
 */
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    'thisisissjshshshshshshshsgssik'
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

/**
 * Login user credentials
 */
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login Email');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login pass');
  }

  return user;
};

/**
 * middleware
 * Hash the plan text password
 */
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * middleware
 * Delete user - cascade from other table
 */
userSchema.pre('remove', async function (next) {
  const user = this;
  await Appointment.deleteMany({ user: user._id });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
