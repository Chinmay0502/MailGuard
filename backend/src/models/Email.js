const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },

    prediction: {
      type: String,
      enum: ["Spam", "Ham"],
      required: true,
    },

    probability: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Email", emailSchema);