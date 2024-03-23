const express = require("express");
const {
  getProducts,
  // getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { verifyAdmin } = require("../middleware/verifyAdmin");
const router = express.Router();

router.get("/read", getProducts);
// router.get("/read/:id", getProductById); not needed because I am displaying single product using redux state
router.post("/create", verifyAdmin, createProduct);
router.put("/update/:id", verifyAdmin, updateProduct);
router.delete("/delete/:id", verifyAdmin, deleteProduct);

module.exports = router;
