const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middleware/errHandler");
const bookRouter = require("./routes/bookRouter");

const PORT = process.env.PORT || 5001;

//? Middlewares
app.use(express.json());
app.use(errorHandler);

//! Connect to MongoDB
mongoose
.connect("mongodb://localhost:27017")
.then(console.log("DB connected....."))
.catch((err) => {
  console.log("Something went wrong" + err);
});

//? Routes

app.use("/user", userRouter);
app.use("/books", bookRouter)

//! Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
