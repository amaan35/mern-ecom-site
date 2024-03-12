const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const app = express();
const port = 3000;

dotenv.config();

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log("error connecting to database : ", error);
  });
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`server started at port : ${port}`);
});
