const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRouter = require("./routes/product.route");
const authRouter = require("./routes/auth.route");
const orderRouter = require("./routes/order.route");
const app = express();
app.use(express.json());
const port = 3001;
const path = require("path");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log("error connecting to database : ", error);
  });

const _dirname = path.resolve();

app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

app.use(express.static(path.join(_dirname, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "frontend", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`server started at port : ${port}`);
});
