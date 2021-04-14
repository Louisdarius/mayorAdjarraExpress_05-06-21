const mongoose = require('mongoose');
const newsListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    subTitle: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: Buffer,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('NewsList', newsListSchema);
