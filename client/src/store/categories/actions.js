import * as types from "./types";

export const categoriesCategoriesSetter = (payload) => ({
  type: types.CATEGORIES_CATEGORIES_SETTER,
  payload,
});

export const categoriesIsloadingSetter = (payload) => ({
  type: types.CATEGORIES_ISLOADING_SETTER,
  payload,
});

export const getCategories = () => ({
  type: types.CATEGORIES_GET,
});

export const getCategoriesSuccess = (payload) => ({
  type: types.CATEGORIES_GET_SUCCESS,
  payload,
});

export const getCategoriesFailure = (payload) => ({
  type: types.CATEGORIES_GET_FAILURE,
  payload,
});
