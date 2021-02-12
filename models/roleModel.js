const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
      type: Date,
      required: true
  },
  updatedAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Role", roleSchema);
