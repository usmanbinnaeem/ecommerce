const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name Required",
      minlength: [2, "Too Short"],
      maxlength: [30, "Too Long"],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
