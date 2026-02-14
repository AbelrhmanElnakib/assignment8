const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    message: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    capped: { size: 1024 * 1024 }
  }
);

module.exports = mongoose.model("Log", logSchema);
