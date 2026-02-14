const express = require("express");
const connectDB = require("./config/DB");

const app = express();
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Assignment 8 running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

