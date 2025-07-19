const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pics: [String],
    docs: [String],
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model("Data", userDataSchema);
module.exports = Data;
