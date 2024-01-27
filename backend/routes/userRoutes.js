const express = require("express");
const router = express.Router();
const {
  getUser,
  createUser,
  loginUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/me", protect, getUser);
router.post("/", createUser);
router.post("/login", loginUser);

module.exports = router;
