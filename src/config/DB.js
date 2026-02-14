const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/assignment8");
    console.log("Database connected");
  } catch (error) {
    console.error("Database error", error.message);
  }
};

module.exports = connectDB;
