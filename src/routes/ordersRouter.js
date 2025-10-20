const express = require("express");
const {
  createOrderHandler,
  getOrdersHandler,
} = require("../controllers/orderController.js");

const router = express.Router();

router.post("/", createOrderHandler);
router.get("/", getOrdersHandler);

module.exports = router;
