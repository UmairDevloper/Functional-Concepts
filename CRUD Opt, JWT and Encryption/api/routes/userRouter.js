const express = require("express");
const UserCtrl = require("../controllers/user");
const isAuthorized = require("../middleware/isAuth");

const userRouter = express.Router();

userRouter.post("/register", UserCtrl.register);
userRouter.post("/login", UserCtrl.login);
userRouter.get("/profile", isAuthorized, UserCtrl.getProfile);
userRouter.put("/update-profile", isAuthorized, UserCtrl.updateProfile);
userRouter.delete("/delete-profile", isAuthorized, UserCtrl.deleteProf);

module.exports = userRouter;
