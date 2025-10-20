import express from "express";
import {
  addBotHandler,
  removeBotHandler,
} from "../controllers/botController.js";

const router = express.Router();

router.post("/", addBotHandler); // POST /bots
router.delete("/", removeBotHandler); // DELETE /bots

export default router;
