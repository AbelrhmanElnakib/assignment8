const express = require("express");
const { connectDB } = require("./config/DB");
const bookRoutes = require("./routes/book.routes");

const app = express();
app.use(express.json());

connectDB();

app.use("/books", bookRoutes);

app.listen(3000, () => {
  console.log("Server running");
});

