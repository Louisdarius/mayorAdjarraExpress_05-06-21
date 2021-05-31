const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema(
  {
    rate: {
      type: String,
      trim: true,
      //required: true,
    },
    navigation: {
      type: String,
      trim: true,
      required: true,
    },
    action: {
      type: String,
      trim: true,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      trim: true,
      required: true,
      enum: ['unread', 'read'],
      default: 'unread',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
