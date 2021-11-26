const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discountSchema = new Schema({
  priceRequired: { type: Number, required: true },
  percentage: { type: Number, required: true },
});

module.exports = mongoose.model("Discount", discountSchema);
