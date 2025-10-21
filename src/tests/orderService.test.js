const botService = require("../services/botService.js");
const { orderService } = require("../services/orderService.js");
const setupTestEnv = require("./testUtils.js");

describe("OrderService", () => {
  setupTestEnv();

  test("should create a normal order", () => {
    const order = orderService.createOrder("normal");
    expect(order.id).toBe(1);
    expect(order.type).toBe("normal");
    expect(order.status).toBe("pending");
    expect(orderService.pending).toContain(order);
  });

  test("should create a VIP order in front of normal orders", () => {
    const normalOrder = orderService.createOrder("normal");
    const vipOrder = orderService.createOrder("vip");

    expect(orderService.pending[0]).toBe(vipOrder);
    expect(orderService.pending[1]).toBe(normalOrder);
  });

  test("order should be not be in pending if under processing", () => {
    const order = orderService.createOrder("normal");
    botService.addBot();

    expect(orderService.pending).not.toContain(order);
    expect(botService.processing.values()).toContain(order);
  });

  test("should complete order correctly", () => {
    const order = orderService.createOrder("normal");
    botService.addBot();

    orderService.completeOrder(order);

    expect(order.status).toBe("complete");
    expect(orderService.complete).toContain(order);
    expect(orderService.pending).not.toContain(order);
  });
});
