const mongoose = require("mongoose");

const emergencyContactSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    note: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String }, // 기본 이름
  birth: { type: String },
  gender: { type: String },
  bloodType: { type: String },
  allergy: { type: String },
  medication: { type: String },
  condition: { type: String },
  surgeryHistory: { type: String },
  donorStatus: { type: String },
  note: { type: String },
  emergencyContacts: [
    {
      name: String,
      phone: String,
      note: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
