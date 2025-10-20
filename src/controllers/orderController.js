import { orderService } from "../services/orderService.js";

export function createOrderHandler(req, res) {
  const { type } = req.body;
  if (!["vip", "normal"].includes(type)) {
    return res.status(400).json({ error: "Invalid order type" });
  }

  const order = orderService.createOrder(type);
  res.status(201).json(order);
}

export function getOrdersHandler(req, res) {
  res.json(orderService.getOrders());
}
