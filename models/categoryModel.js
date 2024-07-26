const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short Category name"],
      maxlength: [32, "Too long Category name"],
    },
    // A and B => shoping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const CategoryModel = model("category", categorySchema);
module.exports = CategoryModel;
