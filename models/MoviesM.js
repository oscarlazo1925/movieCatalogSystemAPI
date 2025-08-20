const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Comment sub-document with User reference
const commentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 🔗 reference to User
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { _id: true }
);

// Main Movie schema
const movieSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String },
    genre: { type: String, required: true },
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
