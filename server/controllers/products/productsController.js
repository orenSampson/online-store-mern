const Product = require("../../models/product");

const { ALL_PRODUCTS, PRODUCTS_PER_PAGE } = require("../../constants/products");
const { successfulResponse } = require("../../constants/responses");

exports.getProdcuts = async (req, res, next) => {
  const category = req.get("category");
  let page = Math.max(1, req.get("page"));

  let productsArr, DocumentsAmount;
  try {
    DocumentsAmount = await Product.countDocuments(
      category === ALL_PRODUCTS ? {} : { category }
    );

    if (DocumentsAmount == null) {
      throw new Error("error retrieving number of documents");
    }

    productsArr = await Product.find(
      category === ALL_PRODUCTS ? {} : { category }
    )
      .skip(PRODUCTS_PER_PAGE * (page - 1))
      .limit(PRODUCTS_PER_PAGE)
      .lean();

    if (!productsArr) {
      throw new Error("products array empty");
    }
  } catch (error) {
    console.log(`error`, error);
  }

  if (!productsArr.length) {
    page = 1;
  }

  const totalPages =
    DocumentsAmount % PRODUCTS_PER_PAGE > 0
      ? Math.floor(DocumentsAmount / PRODUCTS_PER_PAGE) + 1
      : Math.floor(DocumentsAmount / PRODUCTS_PER_PAGE);

  return res
    .status(successfulResponse.status)
    .json({ productsArr, totalPages, page });
};
