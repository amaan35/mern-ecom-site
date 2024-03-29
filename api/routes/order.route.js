const express = require("express");
const { createOrder, getAllOrders } = require("../controllers/order.controller");
const { verifyAdmin } = require("../middleware/verifyAdmin");

const router = express.Router();

router.post("/create", verifyAdmin, createOrder);
router.get("/get", verifyAdmin, getAllOrders);

module.exports = router;