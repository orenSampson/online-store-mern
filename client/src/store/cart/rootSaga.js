import { takeLatest } from "redux-saga/effects";

import * as cartTypes from "./types";
import * as cartSagas from "./sagas";

export const cartRootSagas = [
  takeLatest(
    cartTypes.CART_ADD_REMOVE_PRODUCT,
    cartSagas.addRemoveProductHandler
  ),
  takeLatest(cartTypes.CART_SEND_TRANSACTION, cartSagas.sendTransactionHandler),
  takeLatest(cartTypes.CART_GET_DISCOUNTS, cartSagas.getDiscountsHandler),
  takeLatest(
    cartTypes.CART_SEND_TRANSACTION_SUCCESS,
    cartSagas.sendTransactionSuccessHandler
  ),
  takeLatest(
    cartTypes.CART_SEND_TRANSACTION_FAILURE,
    cartSagas.sendTransactionFailureHandler
  ),
  takeLatest(cartTypes.CART_CLEAR_CART, cartSagas.clearCartHandler),
];
