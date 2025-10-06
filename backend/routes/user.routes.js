const express = require("express");
const { body } = require("express-validator");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateGameStats,
} = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const checkDbConnection = require("../middleware/db.middleware");

const router = express.Router();

// Validation rules
const registerValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const gameStatsValidation = [
  body("won").isBoolean().withMessage("Won must be a boolean"),
  body("attempts")
    .isInt({ min: 1 })
    .withMessage("Attempts must be a positive integer"),
];

// Public routes (require database)
router.post("/register", checkDbConnection, registerValidation, registerUser);
router.post("/login", checkDbConnection, loginValidation, loginUser);

// Protected routes (require database)
router.get("/profile", checkDbConnection, authMiddleware, getUserProfile);
router.put(
  "/game-stats",
  checkDbConnection,
  authMiddleware,
  gameStatsValidation,
  updateGameStats
);

module.exports = router;
