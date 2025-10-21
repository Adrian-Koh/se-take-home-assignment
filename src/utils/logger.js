function log(message) {
  const timestamp = new Date().toLocaleTimeString("en-GB", { hour12: false });
  const line = `[${timestamp}] ${message}\n`;
  console.log(line.trim());
}

function logFinalSummary({
  totalOrders,
  vipCount,
  normalCount,
  completed,
  activeBots,
  pending,
}) {
  const summary = `
Final Status:
- Total Orders Processed: ${totalOrders} (${vipCount} VIP, ${normalCount} Normal)
- Orders Completed: ${completed}
- Active Bots: ${activeBots}
- Pending Orders: ${pending}
`;
  console.log(summary);
}

module.exports = { log, logFinalSummary };
