const asyncHandler = require("express-async-handler");
const Books = require("../models/book");

const BookCtrl = {
  create: asyncHandler(async (req, res) => {
    const { title, author, stock, dop, stats } = req.body;

    if (!title || !author || !stock || !dop || !stats) {
      throw new Error("All fields are required");
    }

    const normalizedTitle = title.toLowerCase();
    const bookCreated = await Books.create({
      user: req.user,
      title: normalizedTitle,
      author,
      stock,
      dop,
      stats,
    });

    res.json({
      message: "Book created successfully",
      bookCreated,
    });
  }),

  lists: asyncHandler(async (req, res) => {
    const booksFound = await Books.find({ user: req.user });
    console.log(booksFound);

    if (!booksFound) {
      throw new Error("No books found");
    }

    res.json({ booksFound });
  }),

  updateData: asyncHandler(async (req, res) => {
    const bookFound = await Books.findById(req.params.id);
    console.log(bookFound);

    if (!bookFound) {
      throw new Error("Book not found");
    }

    if (bookFound && bookFound.user.toString() === req.user.toString()) {
      (bookFound.title = req.body.title || bookFound.title),
        (bookFound.author = req.body.author || bookFound.author),
        (bookFound.stock = req.body.stock || bookFound.stock),
        (bookFound.dop = req.body.dop || bookFound.dop),
        (bookFound.stats = req.body.stats || bookFound.stats);

      const bookUpdated = await bookFound.save();
      res.json({
        message: "Book updated successfully",
        bookUpdated,
      });
    } else {
      throw new Error("You are not authorized");
    }
  }),

  delete: asyncHandler(async (req, res) => {
    const bookFound = await Books.findById(req.params.id);
    const { id } = bookFound;
    if (!bookFound) {
      throw new Error("Book not found");
    }

    if (bookFound && bookFound.user.toString() === req.user.toString()) {
      await Books.findByIdAndDelete(id);
      res.json({
        message: "Book deleted successfully",
      });
    } else {
      throw new Error("You are not authorized");
    }
  }),

  filter: asyncHandler(async (req, res) => {
    const { stock, stats, title } = req.query;
    let filter = { user: req.user };
    // const getNormalizedTitle = title.toLowerCase();
    if (stock) {
      filter.stock = parseInt(stock);
    }
    if (stats && stats !== "Available") {
      filter.stats = stats;
    }
    if (title) {
      filter.title = { $regex: title.toLowerCase(), $options: "i" };
    }

    const booksFound = await Books.find(filter).sort({ dop: -1 });
    res.json({ booksFound });
  }),
};

module.exports = BookCtrl;
