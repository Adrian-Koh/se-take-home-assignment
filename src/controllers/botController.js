import { botService } from "../services/botService.js";

export function addBotHandler(req, res) {
  const bot = botService.addBot();
  res
    .status(201)
    .json({
      message: `Bot ${bot.id} added`,
      totalBots: botService.bots.length,
    });
}

export function removeBotHandler(req, res) {
  const bot = botService.removeBot();
  if (!bot) return res.status(400).json({ error: "No bots to remove" });
  res.json({
    message: `Bot ${bot.id} removed`,
    totalBots: botService.bots.length,
  });
}
