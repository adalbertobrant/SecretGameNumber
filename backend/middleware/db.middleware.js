const mongoose = require("mongoose");

// Middleware to check if database is available
const checkDbConnection = (req, res, next) => {
  if (!process.env.MONGODB_URI) {
    return res.status(503).json({
      success: false,
      message: "Database not configured. Please play as guest.",
      code: "DB_NOT_CONFIGURED",
    });
  }

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: "Database not available. Please play as guest.",
      code: "DB_NOT_CONNECTED",
    });
  }

  next();
};

module.exports = checkDbConnection;
