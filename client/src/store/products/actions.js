import * as types from "./types";

export const products_prodcuts_setter = (payload) => ({
  type: types.PRODUCTS_PRODUCTS_SETTER,
  payload,
});

export const products_category_setter = (payload) => ({
  type: types.PRODUCTS_CATEGORY_SETTER,
  payload,
});

export const get_products = (payload) => ({
  type: types.PRODUCTS_GET,
  payload,
});

export const get_prodcuts_success = (payload) => ({
  type: types.PRODUCTS_GET_SUCCESS,
  payload,
});

export const get_prodcuts_failure = (payload) => ({
  type: types.PRODUCTS_GET_FAILURE,
  payload,
});

export const products_reset_state = () => ({
  type: types.PRODUCTS_RESET_STATE,
});
