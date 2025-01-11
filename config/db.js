const mongoose = require("mongoose");

const mongo_url = "mongodb+srv://shopcirclestore:nD4lMeKCvlwGO0rS@cluster0.h1iet.mongodb.net/store";

const ConnectDb = () => {
  mongoose.connect(mongo_url, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    socketTimeoutMS: 45000, // Socket timeout after 45 seconds
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error in connecting to the database:", error.message);
    process.exit(1); // Terminate the process if the connection fails
  });
};

module.exports = ConnectDb;
