const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    required: true,
  },
  tel: {
    type: Number,
    required: false,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Role',
  },
},
{timestamps: true}
);

module.exports = mongoose.model('User', userSchema);
