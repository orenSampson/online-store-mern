const User = require("../../models/user");
const Discount = require("../../models/discount");
const Product = require("../../models/product");
const Transaction = require("../../models/transaction");
const {
  userNotLoggedIn,
  serverError,
  transactionCreated,
  successfulResponse,
} = require("../../constants/responses");

module.exports = async (req, res, next) => {
  if (!res.locals.isAuth) {
    return res
      .status(userNotLoggedIn.status)
      .json({ message: userNotLoggedIn.message });
  }

  const userID = res.locals.payload.sub;

  const { productsAndAmountArr, discountID } = req.body;

  if (!productsAndAmountArr?.length || !userID) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  try {
    const user = await User.findOne({ _id: userID }).lean();
    if (!user) {
      throw new Error();
    }
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  let discount;
  if (discountID) {
    try {
      discount = await Discount.findOne({ _id: discountID }).lean();
      if (!discount) {
        throw new Error();
      }
    } catch (error) {
      return res
        .status(serverError.status)
        .json({ message: serverError.message });
    }
  }

  let totalPrice = 0;
  const productsModelArr = [];
  // check to export to findOne logic to one generic one

  for (const {
    id: transActionProductID,
    amount: transActionAmount,
  } of productsAndAmountArr) {
    try {
      const product = await Product.findOne({ _id: transActionProductID });
      if (!product || product.amount < transActionAmount) {
        throw new Error();
      }
      product.amount -= transActionAmount;
      productsModelArr.push(product);
      totalPrice += transActionAmount * product.price;
    } catch (error) {
      return res
        .status(serverError.status)
        .json({ message: serverError.message });
    }
  }

  if (discount) {
    const { priceRequired, percentage } = discount;
    if (totalPrice >= priceRequired) {
      totalPrice = totalPrice * ((100 - percentage) / 100);
    } else {
      discountID = null;
    }
  }

  totalPrice = totalPrice.toFixed(2);

  const transaction = new Transaction({
    userID,
    discountID,
    productsAndAmount: productsAndAmountArr.map((productAndAmount) => ({
      productID: productAndAmount.id,
      amount: productAndAmount.amount,
    })),
    totalPrice,
  });

  for (const productModel of productsModelArr) {
    try {
      await productModel.save();
    } catch (error) {
      return res
        .status(serverError.status)
        .json({ message: serverError.message });
    }
  }

  try {
    await transaction.save();
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  return res
    .status(transactionCreated.status)
    .json({ message: transactionCreated.message });
};
