const Discount = require("../../models/discount");
const {
  serverError,
  successfulResponse,
} = require("../../constants/responses");

module.exports = async (req, res, next) => {
  let discounts;
  try {
    discounts = await Discount.find({}).lean();
    if (!discounts) {
      throw new Error();
    }
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  return res.status(successfulResponse.status).json({ discounts });
};
