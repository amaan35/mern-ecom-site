const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  items: [
    {
      quantity: {
        type: Number,
        default: 1,
      },
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;
