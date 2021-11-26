const Category = require("../../models/category");

const { successfulResponse } = require("../../constants/responses");

exports.getCategories = async (req, res, next) => {
  let categoriesArr;
  try {
    categoriesArr = await Category.find({}).lean();
    if (!categoriesArr) {
      throw new Error("categories array empty");
    }
  } catch (error) {
    console.log(`error`, error);
  }

  return res.status(successfulResponse.status).json(categoriesArr);
};
