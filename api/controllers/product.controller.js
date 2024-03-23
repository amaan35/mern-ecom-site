const { Product } = require("../models/product.js");

const getProducts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 6;
    const productList = await Product.find({
      ...(req.query.category && {category:req.query.category}),
      ...(req.query.searchTerm && {
        $or: [
          {title: { $regex : req.query.searchTerm, $options : "i"}},
          {slug: {$regex : req.query.searchTerm, $options: "i"}}
        ]
      })
    }).skip(startIndex).limit(limit);
    res.status(200).json(productList);
  } catch (error) {
    console.log(error.message);
  }
};

// Not needed as I am using redux state to display the product clicked, instead of fetching it from backend
// const getProductById = async (req, res) => {
//   try {
//     const product_id = req.params.id;
//     const product = await Product.findById(product_id);
//     res.status(200).json(product);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const createProduct = async (req, res) => {
  if (!req.decodedUser.isAdmin) {
    return res.status(401).json("You are not authorized to create a product");
  }
  const { title, category, brand, price, stock, images } = req.body;
  if (!title || !category || !brand || !price || !stock || !images) {
    return res.status(400).json("All fields are required");
  }
  const slug = title
    .toLowerCase()
    .split(" ")
    .join("-")
    .replace(/[^a-zA-Z0-9-]/g, "");
  try {
    const newProduct = new Product({
      title,
      category,
      brand,
      price,
      stock,
      slug,
      images,
    });
    const savedProduct = await newProduct.save();
    return res.status(200).json(savedProduct);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateProduct = async (req, res) => {
  if (!req.decodedUser.isAdmin) {
    return res.status(401).json("You are not authorized to create a product");
  }
  const { title, category, brand, price, stock, images } = req.body;
  if (!title || !category || !brand || !price || !stock || !images) {
    return res.status(400).json("All fields are required");
  }
  const slug = title
    .toLowerCase()
    .split(" ")
    .join("-")
    .replace(/[^a-zA-Z0-9-]/g, "");
  try {
    const product_id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(product_id, {
      title,
      category,
      brand,
      price,
      stock,
      slug,
      images,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteProduct = async (req, res) => {
  if(!req.decodedUser.isAdmin){
    return res.status(401).json("Unauthorized to delete this product")
  }
  try {
    const product_id = req.params.id;
    await Product.findByIdAndDelete(product_id);
    res.status(200).json("Product has been deleted successfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getProducts,
  // getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
