const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    time: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    adminUser: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        notes: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
