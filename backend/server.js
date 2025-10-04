const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/users", require("./routes/user.routes"));

// Health check route
app.get("/api/v1/health", (req, res) => {
  res.json({ message: "Secret Game API is running!" });
});

// MongoDB Connection (optional - graceful fallback)
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => {
      console.warn("⚠️  MongoDB connection failed:", err.message);
      console.log("🎮 App will continue without database features");
    });
} else {
  console.log("⚠️  No MONGODB_URI found - running without database");
  console.log("🎮 Users can still play as guests");
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Base URL: http://localhost:${PORT}/api/v1`);
});

module.exports = app;
