import { call, put, select } from "redux-saga/effects";

import * as productsActions from "./actions";
import * as loadingActions from "../loading/actions";
import * as paginationActions from "../pagination/actions";
import * as messageQueueActions from "../messageQueue/actions";
import { LOADING_INITIAL_STATE } from "../loading/reducers";
import { requestGetProducts } from "../../api/productsAPI";
import { PRODUCTS_ARRAY_EMPTY } from "../constants/messages";

export const currentCartProductsState = (state) => state.cartReducers.products;

export function* getProductsHandler({ payload }) {
  const currentStateCartProducts = yield select(currentCartProductsState);

  try {
    yield put(
      loadingActions.loadingIsloadingSetter(!LOADING_INITIAL_STATE.isLoading)
    );

    const { data } = yield call(requestGetProducts, payload);

    if (!data?.productsArr.length) {
      throw new Error(PRODUCTS_ARRAY_EMPTY);
    }

    const productsArr = data.productsArr.map((product) => ({
      id: product._id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      amount: product.amount,
      image: product.image,
    }));

    for (const cartProduct of currentStateCartProducts) {
      const indexProduct = productsArr.findIndex((product) => {
        return product.id === cartProduct.id;
      });

      if (indexProduct >= 0) {
        productsArr[indexProduct].amount -= cartProduct.amount;
      }
    }

    const payloadSuccess = {
      productsArr,
      totalPages: data.totalPages,
      page: data.page,
    };

    yield put(productsActions.getProdcutsSuccess(payloadSuccess));
  } catch (error) {
    yield put(productsActions.getProdcutsFailure(error.message));
  }
}

export function* getProductsSuccessHandler({ payload }) {
  yield put(
    loadingActions.loadingIsloadingSetter(LOADING_INITIAL_STATE.isLoading)
  );

  yield put(productsActions.productsProdcutsSetter(payload.productsArr));

  yield put(
    paginationActions.newStatePagination({
      totalPages: payload.totalPages,
      page: payload.page,
    })
  );
}

export function* getProductsfailureHandler({ payload }) {
  yield put(
    loadingActions.loadingIsloadingSetter(LOADING_INITIAL_STATE.isLoading)
  );

  yield put(
    messageQueueActions.messagequeueAddMessage({
      type: "error",
      content: payload,
    })
  );
}
