const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  year: {
    type: mongoose.Schema.Types.Mixed
  },
  genres: {
    type: [String]
  }
});

module.exports = mongoose.model("Book", bookSchema);
