const mongoose = require("mongoose");

const username = process.env.DB_USER,
  password = process.env.DB_PASSWORD,
  dbName = process.env.DB_NAME;

const dbConnection = () => {
  mongoose
    .connect(
      `mongodb+srv://${username}:${password}@${dbName}/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => {
      console.log("Connected to MongoDB");
    });
};

module.exports = dbConnection;
