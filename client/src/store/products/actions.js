import * as types from "./types";

export const productsProdcutsSetter = (payload) => ({
  type: types.PRODUCTS_PRODUCTS_SETTER,
  payload,
});

export const productsCategorySetter = (payload) => ({
  type: types.PRODUCTS_CATEGORY_SETTER,
  payload,
});

export const getProducts = (payload) => ({
  type: types.PRODUCTS_GET,
  payload,
});

export const getProdcutsSuccess = (payload) => ({
  type: types.PRODUCTS_GET_SUCCESS,
  payload,
});

export const getProdcutsFailure = (payload) => ({
  type: types.PRODUCTS_GET_FAILURE,
  payload,
});

export const productsResetState = () => ({
  type: types.PRODUCTS_RESET_STATE,
});
