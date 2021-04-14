const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema(
  {
    rate: {
      type: String,
      trim: true,
      required: true,
    },
    look: {
      type: String,
      trim: true,
      required: true,
    },
    usage: {
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
      enum: ['pending', 'approved'],
      default: 'pending',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
