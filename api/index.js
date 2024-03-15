const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const productRouter = require("./routes/product.route")
const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

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

app.use("/product", productRouter);

app.listen(port, () => {
  console.log(`server started at port : ${port}`);
});
