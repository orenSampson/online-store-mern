import clone from "lodash.clonedeep";

import * as types from "./types";

export const CART_INITIAL_STATE = {
  discounts: null,
  isDiscountApplied: false,
  products: [],
  totalPriceBeforeDiscount: 0,
  totalPriceAfterDiscount: 0,
};

const reducer = (state = clone(CART_INITIAL_STATE), action) => {
  switch (action.type) {
    case types.CART_DISCOUNTS_SETTER:
      return {
        ...state,
        discounts: clone(action.discounts),
      };

    case types.CART_ISDISCOUNTAPPLIED_SETTER:
      return {
        ...state,
        isDiscountApplied: action.isDiscountApplied,
      };

    case types.CART_PRODUCTS_SETTER:
      return {
        ...state,
        products: clone(action.cartProducts),
      };

    case types.CART_TOTALPRICE_BEFORE_DISCOUNT_SETTER:
      return {
        ...state,
        totalPriceBeforeDiscount: action.totalPriceBeforeDiscount,
      };

    case types.CART_TOTALPRICE_AFTER_DISCOUNT_SETTER:
      return {
        ...state,
        totalPriceAfterDiscount: action.totalPriceAfterDiscount,
      };

    case types.CART_RESET_STATE:
      return clone(CART_INITIAL_STATE);

    default:
      return { ...state };
  }
};

export default reducer;
