const express = require("express");
const BookCtrl = require("../controllers/books");
const isAuthorized = require("../middleware/isAuth");
const bookRouter = express.Router();

bookRouter.post("/create", isAuthorized, BookCtrl.create);
bookRouter.get("/lists", isAuthorized, BookCtrl.lists);
bookRouter.put("/update/:id", isAuthorized, BookCtrl.updateData);
bookRouter.delete("/delete/:id", isAuthorized, BookCtrl.delete);
bookRouter.get("/filter", isAuthorized, BookCtrl.filter);

module.exports = bookRouter;
