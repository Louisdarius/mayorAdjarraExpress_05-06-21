const mongoose = require('mongoose');
const feedbackListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FeedbackList', feedbackListSchema);
