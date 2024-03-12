const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { Product } = require("./models/product");
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

app.post("/create", async (req, res) => {
  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
    images: req.body.images,
  });
  await Product.create(newProduct);
  res.status(200).json("Product added to the database");
});

app.get("/read", async (req, res) => {
  const productList = await Product.find();
  res.status(200).send(productList);
});

app.get("/read/:id", async (req, res)=>{
    const product_id = req.params.id;
    const product = await Product.findById(product_id);
    res.status(200).json(product);
})

app.put("/update/:id", async (req, res) => {
  const product_id = req.params.id;
  await Product.findByIdAndUpdate(product_id, {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
    images: req.body.images,
  });
  res.status(200).json("Product updated successfully");
});

app.delete("/delete/:id", async (req, res)=>{
    const product_id = req.params.id;
    await Product.findByIdAndDelete(product_id);
    res.status(200).json("Product deleted successfully")
})

app.listen(port, () => {
  console.log(`server started at port : ${port}`);
});
