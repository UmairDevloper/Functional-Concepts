require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const dataRouter = require("./routes/data");

//? Middleware
app.use(express.json());

//? Mongo DB Connection
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

//? Routes
app.use("/users", userRouter);
app.use("/data", dataRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
