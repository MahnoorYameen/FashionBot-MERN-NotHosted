const { Schema, model } = require("mongoose");

const ProductAddSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    // required: true,
  },
  images: [
    {
      type: [String], // Store image URLs
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductAdd = model("productAdd", ProductAddSchema);
module.exports = ProductAdd;
