const express = require("express");
const userCtrl = require("../controllers/user");
const uploads = require("../uploadSetup/multer");
const userRouter = express.Router();

userRouter.post("/create", userCtrl.create);
userRouter.get("/lists", userCtrl.list);
userRouter.put("/update/:id", uploads.single("profilePic"), userCtrl.update);

module.exports = userRouter;
