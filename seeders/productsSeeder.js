const axios = require("axios");

const Product = require("../models/product");

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const initProductsSeeder = () => {
  Product.estimatedDocumentCount(async (err, count) => {
    if (!err && count === 0) {
      let productsArr;
      try {
        productsArr = await axios.get("https://fakestoreapi.com/products");
        if (!productsArr || !productsArr.data) {
          throw new Error("fetched empty products");
        }
        productsArr = productsArr.data;
      } catch (error) {
        console.log(`error`, error);
      }

      for (const product of productsArr) {
        const productModel = new Product({
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          amount: randomNumber(5, 15),
          image: product.image,
        });

        try {
          await productModel.save();
        } catch (error) {
          console.log(`error`, error);
        }
      }
    }
  });
};

module.exports = initProductsSeeder;
