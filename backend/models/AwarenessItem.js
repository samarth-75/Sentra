const mongoose = require("mongoose");

const awarenessSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "Safety",
        "Mental Health",
        "Cyber Safety",
        "Anti-Bullying",
        "Emergency",
        "General"
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    institutionId: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AwarenessItem", awarenessSchema);