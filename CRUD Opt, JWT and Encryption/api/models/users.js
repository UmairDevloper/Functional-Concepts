const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value.endsWith("@gmail.com");
        },
        message: "Invalid type of email",
      },
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("User", userSchema);
module.exports = Users;
