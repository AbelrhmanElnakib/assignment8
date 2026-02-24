const { getDB } = require("../config/DB");

const addBook = async (req, res) => {
  const db = getDB();

  const result = await db.collection("books").insertOne(req.body);

  await db.collection("logs").insertOne({
    message: `Book added`,
    createdAt: new Date()
  });

  res.json(result);
};

const addManyBooks = async (req, res) => {
  const db = getDB();

  const result = await db.collection("books").insertMany(req.body);
  res.json(result);
};

const addLog = async (req, res) => {
  const db = getDB();

  const result = await db.collection("logs").insertOne(req.body);
  res.json(result);
};

const updateFutureBook = async (req, res) => {
  const db = getDB();

  const result = await db.collection("books").updateOne(
    { title: "Future" },
    { $set: { year: 2022 } }
  );

  res.json(result);
};

const findBraveNewWorld = async (req, res) => {
  const db = getDB();

  const book = await db
    .collection("books")
    .findOne({ title: "Brave New World" });

  res.json(book);
};

const findBooksBetweenYears = async (req, res) => {
  const db = getDB();
  const { from, to } = req.query;

  const books = await db
    .collection("books")
    .find({ year: { $gte: Number(from), $lte: Number(to) } })
    .toArray();

  res.json(books);
};

const findByGenre = async (req, res) => {
  const db = getDB();
  const { genre } = req.query;

  const books = await db
    .collection("books")
    .find({ genres: genre })
    .toArray();

  res.json(books);
};

const getBooksWithPagination = async (req, res) => {
  const db = getDB();

  const books = await db
    .collection("books")
    .find()
    .sort({ year: -1 })
    .skip(1)
    .limit(2)
    .toArray();

  res.json(books);
};

const findYearIsInteger = async (req, res) => {
  const db = getDB();

  const books = await db
    .collection("books")
    .find({ year: { $type: "int" } })
    .toArray();

  res.json(books);
};

const excludeGenres = async (req, res) => {
  const db = getDB();

  const books = await db
    .collection("books")
    .find({ genres: { $nin: ["Horror", "Science Fiction"] } })
    .toArray();

  res.json(books);
};

const deleteBeforeYear = async (req, res) => {
  const db = getDB();
  const { year } = req.query;

  const result = await db
    .collection("books")
    .deleteMany({ year: { $lt: Number(year) } });

  res.json(result);
};

const booksAfter2000 = async (req, res) => {
  const db = getDB();

  const books = await db
    .collection("books")
    .aggregate([
      { $match: { year: { $gt: 2000 } } },
      { $sort: { year: -1 } }
    ])
    .toArray();

  res.json(books);
};

const booksAfter2000Fields = async (req, res) => {
  const db = getDB();

  const books = await db
    .collection("books")
    .aggregate([
      { $match: { year: { $gt: 2000 } } },
      {
        $project: {
          _id: 0,
          title: 1,
          author: 1,
          year: 1
        }
      }
    ])
    .toArray();

  res.json(books);
};

const unwindGenres = async (req, res) => {
  const db = getDB();

  const books = await db
    .collection("books")
    .aggregate([{ $unwind: "$genres" }])
    .toArray();

  res.json(books);
};

const booksWithLogs = async (req, res) => {
  const db = getDB();

  const result = await db
    .collection("books")
    .aggregate([
      {
        $lookup: {
          from: "logs",
          localField: "title",
          foreignField: "message",
          as: "logs"
        }
      }
    ])
    .toArray();

  res.json(result);
};

module.exports = {
  addBook,
  addManyBooks,
  addLog,
  updateFutureBook,
  findBraveNewWorld,
  findBooksBetweenYears,
  findByGenre,
  getBooksWithPagination,
  findYearIsInteger,
  excludeGenres,
  deleteBeforeYear,
  booksAfter2000,
  booksAfter2000Fields,
  unwindGenres,
  booksWithLogs
};