import * as types from "./types";

export const cartDiscountsSetter = (payload) => ({
  type: types.CART_DISCOUNTS_SETTER,
  discounts: payload,
});

export const cartIsDiscountAppliedSetter = (payload) => {
  return {
    type: types.CART_ISDISCOUNTAPPLIED_SETTER,
    isDiscountApplied: payload,
  };
};

export const cartProductsSetter = (payload) => ({
  type: types.CART_PRODUCTS_SETTER,
  cartProducts: payload,
});

export const cartTotalPriceBeforeDiscountSetter = (payload) => ({
  type: types.CART_TOTALPRICE_BEFORE_DISCOUNT_SETTER,
  totalPriceBeforeDiscount: payload,
});

export const cartTotalPriceAfterDiscountSetter = (payload) => ({
  type: types.CART_TOTALPRICE_AFTER_DISCOUNT_SETTER,
  totalPriceAfterDiscount: payload,
});

export const cartAddRemoveProduct = (payload) => ({
  type: types.CART_ADD_REMOVE_PRODUCT,
  payload,
});

export const cartSendTransaction = () => ({
  type: types.CART_SEND_TRANSACTION,
});

export const cartGetDiscounts = () => ({
  type: types.CART_GET_DISCOUNTS,
});

export const cartSendTransactionSuccess = () => ({
  type: types.CART_SEND_TRANSACTION_SUCCESS,
});

export const cartSendTransactionFailure = (payload) => ({
  type: types.CART_SEND_TRANSACTION_FAILURE,
  payload,
});

export const cartClearCart = () => ({
  type: types.CART_CLEAR_CART,
});
