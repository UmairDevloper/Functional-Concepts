const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    dop: {
      type: Date,
      default: Date.now,
    },
    stats: {
      type: String,
      enum: ["Available", "Out"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

const Books = mongoose.model("Book", bookSchema);
module.exports = Books;
