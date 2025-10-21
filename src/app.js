const express = require("express");
const ordersRouter = require("./routes/ordersRouter.js");
const botsRouter = require("./routes/botsRouter.js");

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.use("/orders", ordersRouter);
app.use("/bots", botsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
