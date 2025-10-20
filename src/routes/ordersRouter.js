import express from "express";
import {
  createOrderHandler,
  getOrdersHandler,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrderHandler);
router.get("/", getOrdersHandler);

export default router;
