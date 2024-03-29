const { Order } = require("../models/order");

const createOrder = async (req, res) => {
  if (!req.decodedUser) {
    return res.status(401).json("You are not authenticated to create an order");
  }
  const { userId, items } = req.body;
  if (!userId || !items) {
    return res.status(400).json("All fields are required");
  }
  try {
    const newOrder = new Order({
      userId,
      items,
    });
    const savedOrder = await newOrder.save();
    return res.status(200).json(savedOrder);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAllOrders = async (req, res) => {
    if (!req.decodedUser) {
        return res.status(401).json("You are not authenticated to get orders");
      }
      try {
        const order = await Order.findOne({userId:req.decodedUser._id}).populate('items.item').exec();
        return res.status(200).json(order);
      } catch (error) {
        return res.status(500).json(error.message);
      }
}

module.exports = {
  createOrder,
  getAllOrders
};
