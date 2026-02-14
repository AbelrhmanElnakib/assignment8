const express = require("express");
const router = express.Router();

const controller = require("../controllers/book.controller");

router.post("/", controller.addBook);
router.post("/many", controller.addManyBooks);
router.post("/log", controller.addLog);
router.put("/update-future", controller.updateFutureBook);
router.get("/brave", controller.findBraveNewWorld);
router.get("/between-years", controller.findBooksBetweenYears);
router.get("/by-genre", controller.findByGenre);
router.get("/pagination", controller.getBooksWithPagination);
router.get("/year-integer", controller.findYearIsInteger);
router.get("/exclude-genres", controller.excludeGenres);
router.delete("/before-year", controller.deleteBeforeYear);
router.get("/after-2000", controller.booksAfter2000);
router.get("/after-2000-fields", controller.booksAfter2000Fields);
router.get("/unwind-genres", controller.unwindGenres);
router.get("/with-logs", controller.booksWithLogs);


module.exports = router;
