const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateProfile,
  getPublicProfile,
  getMyProfile,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.put("/profile", authMiddleware, updateProfile);
router.get("/profile", authMiddleware, getMyProfile); // ✅ 이거 추가
router.get("/:email", getPublicProfile); // 누구나 조회 가능

module.exports = router;
//
