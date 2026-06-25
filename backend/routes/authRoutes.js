const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("role").isIn(["client", "freelancer"]).withMessage("Invalid role"),
  ],
  register,
);

router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
