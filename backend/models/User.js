const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["superadmin", "admin", "staff", "student"],
      default: "student", // most common
    },

    institutionId: {
      type: String, 
      default: null, // superadmin has no institution
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);