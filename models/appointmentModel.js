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
      enum: ['pending', 'approved', 'disapproved'],
      default: 'pending',
    },
    meetingPref: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
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
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
