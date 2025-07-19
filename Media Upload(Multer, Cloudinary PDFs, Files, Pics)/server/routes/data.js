const express = require("express");
const dataCtrl = require("../controllers/data");
const uploads = require("../uploadSetup/multer");
const dataRouter = express.Router();


dataRouter.post("/add", dataCtrl.uploadMiddleware, dataCtrl.addData);
dataRouter.get("/list", dataCtrl.list);


module.exports = dataRouter;