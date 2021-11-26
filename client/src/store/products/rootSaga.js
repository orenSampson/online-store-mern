import { takeLatest } from "redux-saga/effects";

import * as productsTypes from "./types";
import * as productsSagas from "./sagas";

export const productsRootSagas = [
  takeLatest(productsTypes.PRODUCTS_GET, productsSagas.getProductsHandler),
  takeLatest(
    productsTypes.PRODUCTS_GET_SUCCESS,
    productsSagas.getProductsSuccessHandler
  ),
  takeLatest(
    productsTypes.PRODUCTS_GET_FAILURE,
    productsSagas.getProductsfailureHandler
  ),
];
