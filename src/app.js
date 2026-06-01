const express = require("express");
const cors = require("cors");

const shortUrlRoutes = require("./routes/shortUrl.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", shortUrlRoutes);

app.use("/analytics", analyticsRoutes);

app.use(errorMiddleware);

module.exports = app;