const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const allowedOrigins = [
  "http://localhost:3000",
  "https://first-aid-keyring.vercel.app",
];

const app = express();
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log("✅ Server running on http://localhost:5000");
    });
  })
  .catch((err) => console.error(err));
