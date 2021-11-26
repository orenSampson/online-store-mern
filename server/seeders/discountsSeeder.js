const axios = require("axios");

const Discount = require("../models/discount");

const initDiscountsSeeder = () => {
  Discount.estimatedDocumentCount(async (err, count) => {
    if (!err && count === 0) {
      const discount = new Discount({ priceRequired: 1000, percentage: 10 });
      try {
        await discount.save();
      } catch (error) {
        console.log(`error`, error.message);
      }
    }
  });
};

module.exports = initDiscountsSeeder;
