const { orderService } = require("../services/orderService.js");

function createOrderHandler(req, res) {
  const { type } = req.body;
  if (!["vip", "normal"].includes(type.toLowerCase())) {
    return res.status(400).json({ error: "Invalid order type" });
  }

  const order = orderService.createOrder(type);
  res.status(201).json(order);
}

function getOrdersHandler(req, res) {
  res.json(orderService.getOrders());
}

module.exports = { createOrderHandler, getOrdersHandler };
