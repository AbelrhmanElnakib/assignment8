const mongoose = require("mongoose");

const createBooksCollection = async (req, res) => {
  await mongoose.connection.createCollection("books", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
            minLength: 1
          }
        }
      }
    }
  });

  res.send("Books collection created with validation");
};

const createAuthorsCollection = async (req, res) => {
  const db = mongoose.connection.db;
  await db.collection("authors").insertOne({ name: "Test Author" });

  res.send("Authors collection created implicitly");
};

const createLogsCollection = async (req, res) => {
  const db = mongoose.connection.db;
  await db.createCollection("logs", {
    capped: true,
    size: 1024 * 1024
  });

  res.send("Logs capped collection created");
};

const createTitleIndex = async (req, res) => {
  const db = mongoose.connection.db;
  await db.collection("books").createIndex({ title: 1 });

  res.send("Index created on title");
};

module.exports = {
  createBooksCollection,
  createAuthorsCollection,
  createLogsCollection,
  createTitleIndex
};
