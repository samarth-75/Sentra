const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
    },

    contactEmail: {
      type: String,
      default: "",
    },

    adminId: {
      type: String, // Institution Admin user ID
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Institution", institutionSchema);