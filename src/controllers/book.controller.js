const Book = require("../models/book.model");
const Log = require("../models/log.model");

const addBook = async (req, res) => {
  const book = await Book.create(req.body);

  await Log.create({
    message: `Book added: ${book.title}`
  });

  res.json(book);
};

const addManyBooks = async (req, res) => {
  const books = await Book.insertMany(req.body);

  res.json(books);
};

const addLog = async (req, res) => {
  const log = await Log.create(req.body);
  res.json(log);
};

const updateFutureBook = async (req, res) => {
  const result = await Book.updateOne(
    { title: "Future" },
    { $set: { year: 2022 } }
  );

  res.json(result);
};

const findBraveNewWorld = async (req, res) => {
  const book = await Book.findOne({ title: "Brave New World" });
  res.json(book);
};

const findBooksBetweenYears = async (req, res) => {
  const { from, to } = req.query;

  const books = await Book.find({
    year: { $gte: Number(from), $lte: Number(to) }
  });

  res.json(books);
};

const findByGenre = async (req, res) => {
  const { genre } = req.query;

  const books = await Book.find({ genres: genre });
  res.json(books);
};

const getBooksWithPagination = async (req, res) => {
  const books = await Book.find()
    .sort({ year: -1 })
    .skip(1)
    .limit(2);

  res.json(books);
};

const findYearIsInteger = async (req, res) => {
  const books = await Book.find({
    year: { $type: "int" }
  });

  res.json(books);
};

const excludeGenres = async (req, res) => {
  const books = await Book.find({
    genres: { $nin: ["Horror", "Science Fiction"] }
  });

  res.json(books);
};

const deleteBeforeYear = async (req, res) => {
  const { year } = req.query;

  const result = await Book.deleteMany({
    year: { $lt: Number(year) }
  });

  res.json(result);
};

const booksAfter2000 = async (req, res) => {
  const books = await Book.aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $sort: { year: -1 } }
  ]);

  res.json(books);
};

const booksAfter2000Fields = async (req, res) => {
  const books = await Book.aggregate([
    { $match: { year: { $gt: 2000 } } },
    {
      $project: {
        _id: 0,
        title: 1,
        author: 1,
        year: 1
      }
    }
  ]);

  res.json(books);
};

const unwindGenres = async (req, res) => {
  const books = await Book.aggregate([
    { $unwind: "$genres" }
  ]);

  res.json(books);
};

const booksWithLogs = async (req, res) => {
  const result = await Book.aggregate([
    {
      $lookup: {
        from: "logs",
        localField: "title",
        foreignField: "message",
        as: "logs"
      }
    }
  ]);

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
