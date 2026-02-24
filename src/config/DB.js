const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

const connectDB = async () => {
  await client.connect();
  db = client.db("assignment8");
  console.log("MongoDB connected");
};

const getDB = () => db;

module.exports = { connectDB, getDB };