const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Data = require("../models/data");
const uploads = require("../uploadSetup/multer");

const dataCtrl = {
  // Multer middleware for handling files
  uploadMiddleware: uploads.fields([
    {
      name: "pics",
      maxCount: 10,
    },
    {
      name: "docs",
      maxCount: 10,
    },
  ]),

  // Controller function
  addData: asyncHandler(async (req, res) => {
    try {
      const { name } = req.body;

      const userFound = await User.find({ name });
      if (!userFound) {
        res.status(400);
        throw new Error("User not found");
      }

      const picsUrls = (req.files["pics"] || []).map((file) => file.path);
      const docsUrls = (req.files["docs"] || []).map((file) => file.path);

      const dataCreated = await Data.create({
        name: userFound[0]._id,
        pics: picsUrls,
        docs: docsUrls,
      });

      res.status(201).json(dataCreated);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }),

  list: asyncHandler(async (req, res) => {
    try {
      const dataFound = await Data.find();
      res.status(200).json(dataFound);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }),
};

module.exports = dataCtrl;
