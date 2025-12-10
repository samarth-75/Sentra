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
        "Other"
      ],
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    reporter: {
      type: String, // userId
      required: true,
    },

    isAnonymous: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },

    assignedTo: {
      type: String, // staff/admin userId
      default: null,
    },

    institutionId: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Incident", incidentSchema);