const express = require("express");
const router = express.Router();

const controller = require("../controllers/collection.controller");

router.post("/books", controller.createBooksCollection);
router.post("/authors", controller.createAuthorsCollection);
router.post("/logs", controller.createLogsCollection);
router.post("/books/index", controller.createTitleIndex);

module.exports = router;
