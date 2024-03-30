const express = require("express");
const { createOrder, getAllOrdersOfUser } = require("../controllers/order.controller");
const { verifyAdmin } = require("../middleware/verifyAdmin");

const router = express.Router();

router.post("/create", verifyAdmin, createOrder);
router.get("/get", verifyAdmin, getAllOrdersOfUser);

module.exports = router;