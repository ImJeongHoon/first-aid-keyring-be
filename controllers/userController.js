const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashed });
    await newUser.save();

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("👉 로그인 요청 body:", req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ 사용자 없음:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ 비밀번호 불일치:", password);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
    console.log("정상?");
  } catch (err) {
    console.error("🔥 서버 오류:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    });
    res.json(user);
  } catch (err) {
    console.error("🔥 프로필 업데이트 실패:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

exports.getPublicProfile = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "-password -_id -__v"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
exports.getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select("-password -__v -_id"); // 민감 정보 제외

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("🔥 공개 프로필 조회 실패:", err);
    res.status(500).json({ message: "Server error" });
  }
};
