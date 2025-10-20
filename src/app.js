import express from "express";
import ordersRouter from "./routes/orders.js";
import botsRouter from "./routes/bots.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.use("/orders", ordersRouter);
app.use("/bots", botsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
