const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const userRouter = require("./routes/userHandler.route");
const errorHandler = require("./middlewares/errorHandlers");

// express app initialization
const app = express();
dotenv.config();

// server
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// database connection
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log("Database connection is successful".red.bold);
});

// user route
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Artboard server is working");
});

// Global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
