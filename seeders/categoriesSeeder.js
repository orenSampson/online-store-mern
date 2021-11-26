const axios = require("axios");

const Category = require("../models/category");

const initCategoriesSeeder = () => {
  Category.estimatedDocumentCount(async (err, count) => {
    if (!err && count === 0) {
      let categoriesArr;
      try {
        categoriesArr = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );

        if (!categoriesArr || !categoriesArr.data) {
          throw new Error("fetched empty categories");
        }

        categoriesArr = categoriesArr.data;
      } catch (error) {
        console.log(`error`, error);
      }

      for (const category of categoriesArr) {
        const categoryModel = new Category({
          category,
        });

        try {
          await categoryModel.save();
        } catch (error) {
          console.log(`error`, error);
        }
      }
    }
  });
};

module.exports = initCategoriesSeeder;
