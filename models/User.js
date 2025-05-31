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
  birthDate: { type: String },
  gender: { type: String },
  bloodType: { type: String },
  allergies: { type: String },
  medications: { type: String },
  conditions: { type: String },
  surgeryHistory: { type: String },
  donorStatus: { type: String },
  notes: { type: String },
  emergencyContacts: [
    {
      name: String,
      phone: String,
      note: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
