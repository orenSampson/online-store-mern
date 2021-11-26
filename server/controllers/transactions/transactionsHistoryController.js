const Transaction = require("../../models/transaction");
const Discount = require("../../models/discount");
const {
  userNotLoggedIn,
  serverError,
  successfulResponse,
} = require("../../constants/responses");

module.exports = async (req, res, next) => {
  if (!res.locals.isAuth) {
    return res
      .status(userNotLoggedIn.status)
      .json({ message: userNotLoggedIn.message });
  }
  const userID = res.locals.payload.sub;

  let transactions;
  try {
    transactions = await Transaction.find(
      { userID },
      { _id: 0, __v: 0, updatedAt: 0, userID: 0 }
    )
      .populate([
        {
          path: "productsAndAmount",
          populate: {
            path: "productID",
          },
        },
      ])
      .sort({
        createdAt: "desc",
      });
    if (!transactions) {
      throw new Error();
    }

    transactions = await Promise.all(
      transactions.map(async (transaction) => {
        const productsAndAmound = transaction.productsAndAmount.map(
          (productAndAmount) => ({
            id: productAndAmount.productID._id,
            title: productAndAmount.productID.title,
            description: productAndAmount.productID.description,
            category: productAndAmount.productID.category,
            amount: productAndAmount.amount,
            image: productAndAmount.productID.image,
            price: productAndAmount.productID.price,
          })
        );

        let discount = null;

        if (transaction.discountID) {
          discount = await Discount.find({ _id: transaction.discountID });

          if (!discount) {
            throw new Error();
          }
        }

        return {
          productsAndAmound,
          totalPrice: transaction.totalPrice,
          discountPercentage: discount?.length > 0 && discount[0].percentage,
          createdAt: transaction.createdAt,
        };
      })
    );
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  return res.status(successfulResponse.status).json(transactions);
};
