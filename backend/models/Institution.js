const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  email: { type: String, required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Institution", institutionSchema);