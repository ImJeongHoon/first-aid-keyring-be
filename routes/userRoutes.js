const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateProfile,
  getPublicProfile,
} = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.put("/profile", authMiddleware, updateProfile);
router.get("/:email", getPublicProfile); // 누구나 조회 가능

module.exports = router;
