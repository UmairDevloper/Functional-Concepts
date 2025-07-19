const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const uploads = require("../uploadSetup/multer");

const userCtrl = {
  create: asyncHandler(async (req, res) => {
    try {
      const { name, email, password, profilePic } = req.body;

      if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
      }

      const userExist = await User.findOne({ email });

      if (userExist) {
        res.status(400);
        throw new Error("User already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        profilePic,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          profilePic: user.profilePic,
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    } catch (error) {
      console.log(error);
    }
  }),

  list: asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
  }),

  update: asyncHandler(async (req, res) => {
    try {
      //* Getting fields from user
      const { name, email, profilePic } = req.body;

      //* Fetching the ID
      const user = await User.findById(req.params.id);

      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }

      //* Requesting for file
      if (!req.file || !req.file.path) {
        res.status(400);
        throw new Error("Please upload a file");
      }

      //* Saving the file
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          name,
          email,
          profilePic: req.file.path,
        },
        {
          new: true,
        }
      );

      if (updatedUser) {
        res.status(200).json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          profilePic: updatedUser.profilePic,
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    } catch (error) {
      console.log(error);
    }
  }),
};

module.exports = userCtrl;
