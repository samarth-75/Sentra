const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  email: { type: String, required: true, unique: true },

  passwordHash: { type: String, required: true },

  plainPassword: { type: String, default: null }, // NEW FIELD ✔

  role: {
    type: String,
    enum: ["student", "staff", "admin", "superadmin"],
    required: true,
  },

  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    default: null,
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);