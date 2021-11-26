const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsAndAmountSchema = new Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    amount: { type: Number, required: true, default: 1 },
  },
  { _id: false }
);

const transactionSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    discountID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
    },
    productsAndAmount: [productsAndAmountSchema],
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
