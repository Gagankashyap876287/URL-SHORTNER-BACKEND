const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema(
  {
    clickedAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const shortUrlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true
    },

    shortCode: {
      type: String,
      required: true,
      unique: true
    },

    shortUrl: {
      type: String,
      required: true
    },

    clicks: {
      type: Number,
      default: 0
    },

    clickHistory: [clickSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("ShortUrl", shortUrlSchema);