const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const ConnectDb = require("./config/db");
const path = require("path");
const PORT = 4000;

app.use(cors());
app.use(express.json());
ConnectDb();
// CORS settings (adjust allowed origins as needed)
const allowedOrigins = ['http://localhost:3000', 'http://192.168.56.1:3000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS')); 
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],  
  credentials: true,  
}));




// Static file serving for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Define your routes
const ProductRoutes = require("./routes/productsRoutes");
const AdminRoutes = require("./routes/adminRoutes");

// Initialize the database connection


// Use the routes
app.use("/api/product", ProductRoutes);
app.use("/api/admin", AdminRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("App is running");
});

// Test route to check database connection status
app.use("/test", (req, res) => {
  console.log("Database connection state:", mongoose.connection.readyState);

  if (mongoose.connection.readyState === 1) { // 1 means connected
    console.log("Database is connected");
    res.send("App is running and Database is connected!");
  } else if (mongoose.connection.readyState === 2) {
    console.log("Database is connecting");
    res.send("App is running and Database is connecting...");
  } else {
    console.error("Database is not connected");
    res.status(500).send("App is running but Database is not connected.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log("App is running at port", PORT);
});

module.exports = app;
