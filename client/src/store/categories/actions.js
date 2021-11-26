import * as types from "./types";

export const categories_categories_setter = (payload) => ({
  type: types.CATEGORIES_CATEGORIES_SETTER,
  payload,
});

export const categories_isloading_setter = (payload) => ({
  type: types.CATEGORIES_ISLOADING_SETTER,
  payload,
});

export const get_categories = () => ({
  type: types.CATEGORIES_GET,
});

export const get_categories_success = (payload) => ({
  type: types.CATEGORIES_GET_SUCCESS,
  payload,
});

export const get_categories_failure = (payload) => ({
  type: types.CATEGORIES_GET_FAILURE,
  payload,
});
