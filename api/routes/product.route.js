const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { verifyAdmin } = require("../middleware/verifyAdmin");
const router = express.Router();

router.get("/read", getAllProducts);
// router.get("/read/:id", getProductById); not needed because I am displaying single product using redux state
router.post("/create", verifyAdmin, createProduct);
router.put("/update/:id", verifyAdmin, updateProduct);
router.delete("/delete/:id", verifyAdmin, deleteProduct);

module.exports = router;
