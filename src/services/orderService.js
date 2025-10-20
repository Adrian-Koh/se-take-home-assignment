import { botService } from "./botService.js";

class OrderService {
  constructor() {
    this.pending = [];
    this.complete = [];
    this.lastOrderId = 0;
  }

  createOrder(type) {
    const order = {
      id: ++this.lastOrderId,
      type,
      status: "pending",
      createdAt: Date.now(),
    };

    // VIP orders go before normal orders, after existing VIPs
    if (type === "vip") {
      const firstNormalIndex = this.pending.findIndex(
        (o) => o.type === "normal"
      );
      if (firstNormalIndex === -1) this.pending.push(order);
      else this.pending.splice(firstNormalIndex, 0, order);
    } else {
      this.pending.push(order);
    }

    botService.processNext(); // trigger bots if idle
    return order;
  }

  getNextPending() {
    return this.pending.shift();
  }

  completeOrder(order) {
    order.status = "complete";
    this.complete.push(order);
  }

  returnToPending(order) {
    order.status = "pending";
    this.pending.unshift(order);
  }

  getOrders() {
    return {
      pending: this.pending,
      complete: this.complete,
    };
  }
}

export const orderService = new OrderService();
