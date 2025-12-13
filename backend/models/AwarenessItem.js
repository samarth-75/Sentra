const mongoose = require("mongoose");

const awarenessSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "Bullying",
        "Harassment",
        "Safety",
        "Health",
        "Mental Health",
        "Cyber Safety",
        "Emergency",
        "General",
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AwarenessItem", awarenessSchema);