const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Related to Users collection
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"], // only allow these values
      default: "pending",
    },
    dateAdded: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("Fitness", WorkoutSchema);
