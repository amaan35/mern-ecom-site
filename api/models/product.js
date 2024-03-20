const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  images: [String],
});

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
