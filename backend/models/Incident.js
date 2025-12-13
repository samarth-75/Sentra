const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Bullying",
        "Harassment",
        "Safety Issue",
        "Technical Issue",
        "Lost Item",
        "Emergency",
        "Other",
      ],
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now, // ✅ FIX
    },

    anonymous: {
      type: Boolean,
      default: false, // ✅ FIX
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },

    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // ✅ FIX
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true, // ✅ FIX
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Incident", incidentSchema);