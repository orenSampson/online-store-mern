const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  amount: { type: Number, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
