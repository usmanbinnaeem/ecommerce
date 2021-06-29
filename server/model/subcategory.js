const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const subcategorySchema = new mongoose.Schema(
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
      parent: {
          type: ObjectId,
          ref: "Category",
          required: true,
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subcategorySchema);
