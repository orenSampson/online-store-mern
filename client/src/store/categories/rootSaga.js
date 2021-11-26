import { takeLatest } from "redux-saga/effects";

import * as categoriesTypes from "./types";
import * as categoriesSagas from "./sagas";

export const categoriesRootSagas = [
  takeLatest(
    categoriesTypes.CATEGORIES_GET,
    categoriesSagas.getCategoriesHandler
  ),
  takeLatest(
    categoriesTypes.CATEGORIES_GET_SUCCESS,
    categoriesSagas.getCategoriesSuccessHandler
  ),
  takeLatest(
    categoriesTypes.CATEGORIES_GET_FAILURE,
    categoriesSagas.getCategoriesfailureHandler
  ),
];
