require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const emailRoutes = require("./routes/emailRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

// Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/emails", emailRoutes);
app.use("/api/history", historyRoutes);

// Root
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Spam Detector API is running",
  });
});

// Health
app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
  });
});

// 404 handler - useful for debugging
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});