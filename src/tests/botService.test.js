const botService = require("../services/botService.js");
const { orderService } = require("../services/orderService.js");

describe("BotService", () => {
  beforeEach(() => {
    // Reset everything
    orderService.pending = [];
    orderService.complete = [];
    orderService.lastOrderId = 0;
    botService.bots = [];
    botService.processing.clear();
    botService.nextBotId = 0;
  });

  afterEach(() => {
    botService.bots.forEach((bot) => botService.removeBot(bot));
    botService.bots = [];
    jest.clearAllTimers();
  });

  test("should add a bot", () => {
    const bot = botService.addBot();
    expect(botService.bots.length).toBe(1);
    expect(bot.id).toBe(1);
  });

  test("should remove the latest bot", () => {
    const bot1 = botService.addBot();
    const bot2 = botService.addBot();
    const removed = botService.removeBot();

    expect(removed.id).toBe(bot2.id);
    expect(botService.bots.length).toBe(1);
  });

  test("should process an order", () => {
    jest.useFakeTimers();

    const bot = botService.addBot();
    const order = orderService.createOrder("normal");

    // Fast-forward 10s
    jest.advanceTimersByTime(10000);

    expect(order.status).toBe("complete");
    expect(orderService.complete).toContain(order);
    expect(botService.processing.size).toBe(0);
  });
});
