const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Role', roleSchema);
