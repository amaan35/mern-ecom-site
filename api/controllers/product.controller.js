const { Product } = require("../models/product.js");

const getAllProducts = async (req, res) => {
  try {
    const productList = await Product.find();
    res.status(200).json(productList);
  } catch (error) {
    console.log(error.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const product_id = req.params.id;
    const product = await Product.findById(product_id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
  }
};

const createProduct = async (req, res) => {
  if(!req.decodedUser.isAdmin){
    return res.status(401).json("You are not authorized to create a product");
  }
  const { title, category, brand, price, stock, images } = req.body;
  if (!title || !category || !brand || !price || !stock || !images) {
    return res.status(400).json("All fields are required");
  }
  const slug = title.toLowerCase().split(" ").join("-").replace(/[^a-zA-Z0-9-]/g, "");
  try {
    const newProduct = new Product({
      title,
      category,
      brand,
      price,
      stock,
      slug,
      images
    });
    const savedProduct = await newProduct.save();
    return res.status(200).json(savedProduct);
  } catch (error) {
    return res.json(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
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
    res.status(200).json("Product has been updated");
  } catch (error) {
    console.log(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product_id = req.params.id;
    await Product.findByIdAndDelete(product_id);
    res.status(200).json("Product has been deleted successfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
