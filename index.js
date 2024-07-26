const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const app = express();

dotenv.config({ path: "config.env" });

const _PORT = process.env.PORT || 8000;

app.use(express.json());

const ApiError = require("./utils/apiError");
const dbConnection = require("./config/database");
const getCategoryRoute = require("./routes/categoryRoute");
const globalError = require("./middlewares/errorMiddleware");

// Connect with db
dbConnection();

// Use morgan for logging in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", getCategoryRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`Cant't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

// ======== Listen Port ========
const server = app.listen(_PORT, () => {
  console.log(`I am listening in port ${_PORT}`);
});

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`Error connecting to MongoDB: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down...`);
    process.exit(1);
  });
});
