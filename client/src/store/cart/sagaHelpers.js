export const calculator = ({
  currentStateCartProducts,
  currentStateDiscounts,
}) => {
  let isDiscountApplied = false;

  const selectedDiscount = currentStateDiscounts?.length
    ? currentStateDiscounts[0]
    : null;

  let totalPriceBeforeDiscount = currentStateCartProducts.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.price * currentValue.amount,
    0
  );

  let totalPriceAfterDiscount = totalPriceBeforeDiscount;
  if (selectedDiscount) {
    if (totalPriceBeforeDiscount >= selectedDiscount.priceRequired) {
      isDiscountApplied = true;
      totalPriceAfterDiscount =
        totalPriceBeforeDiscount * ((100 - selectedDiscount.percentage) / 100);
    }
  }

  totalPriceBeforeDiscount = totalPriceBeforeDiscount.toFixed(2);
  totalPriceAfterDiscount = totalPriceAfterDiscount.toFixed(2);

  return {
    isDiscountApplied,
    totalPriceBeforeDiscount,
    totalPriceAfterDiscount,
  };
};
