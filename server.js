const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const allowedOrigins = [
  "http://localhost:3000",
  "https://first-aid-keyring.vercel.app",
  "https://first-aid-keyring-be.onrender.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("🌐 들어온 Origin:", origin); // 디버깅용
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ 차단된 origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();

app.set("trust proxy", true);

// ✅ CORS: 반드시 가장 먼저 선언
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight 대응

// ✅ Body 파싱
app.use(express.json());

// ✅ 공통 응답 헤더 설정 (선택)
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

// ✅ API 라우터 등록
app.use("/api/users", userRoutes);

// ✅ DB 연결 및 서버 실행
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB 연결 실패:", err);
  });
