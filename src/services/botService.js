const { orderService, setBotService } = require("./orderService.js");

class BotService {
  constructor() {
    this.bots = [];
    this.processing = new Map(); // botId -> order
    this.nextBotId = 0;
    this.PROCESSING_TIME_MS = 10000; // 10 seconds per order
  }

  addBot() {
    const bot = { id: ++this.nextBotId };
    this.bots.push(bot);
    this.processNext();
    return bot;
  }

  removeBot() {
    if (this.bots.length === 0) return null;

    const bot = this.bots.pop();
    const processingOrder = this.processing.get(bot.id);

    if (processingOrder) {
      clearTimeout(bot.timeoutRef);
      this.processing.delete(bot.id);
      orderService.returnToPending(processingOrder);
    }

    return bot;
  }

  processNext() {
    this.bots.forEach((bot) => {
      if (!this.processing.has(bot.id)) {
        const order = orderService.getNextPending();
        if (order) {
          this.processing.set(bot.id, order);
          console.log(`Bot ${bot.id} started processing order ${order.id}`);

          bot.timeoutRef = setTimeout(() => {
            orderService.completeOrder(order);
            this.processing.delete(bot.id);
            console.log(`Bot ${bot.id} completed order ${order.id}`);
            this.processNext(); // immediately pick next order if available
          }, this.PROCESSING_TIME_MS);
        }
      }
    });
  }
}

const botService = new BotService();
setBotService(botService);

module.exports = botService;
