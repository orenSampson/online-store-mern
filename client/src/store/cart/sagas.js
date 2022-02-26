import { call, put, select } from "redux-saga/effects";

import * as cartActions from "./actions";
import * as loadingActions from "../loading/actions";
import * as messageQueueActions from "../messageQueue/actions";
import * as productsActions from "../products/actions";
import { CART_INITIAL_STATE } from "./reducers";
import { LOADING_INITIAL_STATE } from "../loading/reducers";
import { requestsendTransaction, requestGetDiscounts } from "../../api/cartAPI";
import { calculator } from "./sagaHelpers";
import * as messages from "../constants/messages";
import { TOKEN_NAME } from "../constants/auth";

const currentProductsState = (state) => state.productsReducers.products;
const currentCartProductsState = (state) => state.cartReducers.products;
const discountsState = (state) => state.cartReducers.discounts;
const isDiscountAppliedState = (state) => state.cartReducers.isDiscountApplied;

//payload.amount > 0 => increase cart product amount & decrease product amount
//payload.amount < 0 => decrease cart product amount & increase product amount
export function* addRemoveProductHandler({ payload }) {
  const currentStateProducts = yield select(currentProductsState);
  const currentStateCartProducts = yield select(currentCartProductsState);
  const currentStateDiscounts = yield select(discountsState);

  try {
    if (payload.amount === 0) {
      throw new Error(messages.ACTION_FAILED);
    }

    const indexProduct = currentStateProducts.findIndex((product) => {
      return product.id === payload.id;
    });

    if (indexProduct < 0) {
      throw new Error(messages.ACTION_FAILED);
    }

    if (
      payload.amount > 0 &&
      currentStateProducts[indexProduct].amount < payload.amount
    ) {
      throw new Error(messages.INVENTORY_EMPTY);
    }

    const indexCartProduct = currentStateCartProducts.findIndex(
      (product) => product.id === payload.id
    );

    if (payload.amount < 0) {
      if (indexCartProduct < 0) {
        throw new Error(messages.ACTION_FAILED);
      } else if (
        payload.amount + currentStateCartProducts[indexCartProduct].amount <
        0
      ) {
        throw new Error(messages.ACTION_FAILED);
      }
    }

    if (indexCartProduct < 0) {
      if (payload.amount > 0) {
        const cartProduct = {
          id: payload.id,
          title: payload.title,
          description: payload.description,
          category: payload.category,
          price: payload.price,
          image: payload.image,
          amount: payload.amount,
        };

        currentStateCartProducts.push(cartProduct);

        currentStateProducts[indexProduct].amount -= payload.amount;
      }
    } else {
      currentStateCartProducts[indexCartProduct].amount += payload.amount;

      currentStateProducts[indexProduct].amount -= payload.amount;

      if (
        !(payload.amount + currentStateCartProducts[indexCartProduct].amount)
      ) {
        currentStateCartProducts.splice(indexCartProduct, 1);
      }
    }

    const {
      isDiscountApplied,
      totalPriceBeforeDiscount,
      totalPriceAfterDiscount,
    } = yield call(calculator, {
      currentStateCartProducts,
      currentStateDiscounts,
    });

    yield put(cartActions.cartIsDiscountAppliedSetter(isDiscountApplied));
    yield put(cartActions.cartProductsSetter(currentStateCartProducts));
    yield put(productsActions.productsProdcutsSetter(currentStateProducts));
    yield put(
      cartActions.cartTotalPriceBeforeDiscountSetter(totalPriceBeforeDiscount)
    );
    yield put(
      cartActions.cartTotalPriceAfterDiscountSetter(totalPriceAfterDiscount)
    );
  } catch (error) {
    yield put(
      messageQueueActions.messagequeueAddMessage({
        type: "error",
        content: error.message,
      })
    );
  }
}

export function* sendTransactionHandler() {
  const currentStateCartProducts = yield select(currentCartProductsState);
  const currentStateDiscounts = yield select(discountsState);
  const currentStateIsDiscount = yield select(isDiscountAppliedState);

  try {
    yield put(
      loadingActions.loadingIsloadingSetter(!LOADING_INITIAL_STATE.isLoading)
    );

    const token = localStorage.getItem(TOKEN_NAME);
    if (!token) {
      throw new Error(messages.NOT_LOGGED_IN_TRANSACTION);
    }

    const payload = {
      productsAndAmountArr: currentStateCartProducts,
      discountID: currentStateIsDiscount ? currentStateDiscounts[0].id : null,
    };

    yield call(requestsendTransaction, payload, token);

    yield put(cartActions.cartSendTransactionSuccess());
  } catch (error) {
    const err =
      error.message ||
      error.response?.data?.message ||
      messages.API_CALL_FAILED;

    yield put(cartActions.cartSendTransactionFailure(err));
  }
}

export function* getDiscountsHandler() {
  try {
    const { data } = yield call(requestGetDiscounts);

    if (data?.discounts?.length > 0) {
      const dicounts = data.discounts.map((discount) => ({
        id: discount._id,
        priceRequired: discount.priceRequired,
        percentage: discount.percentage,
      }));

      yield put(cartActions.cartDiscountsSetter(dicounts));
    }
  } catch (error) {
    yield put(
      messageQueueActions.messagequeueAddMessage({
        type: "error",
        content: error.message,
      })
    );
  }
}

export function* sendTransactionSuccessHandler() {
  yield put(cartActions.cartClearCart());

  yield put(
    messageQueueActions.messagequeueAddMessage({
      type: "success",
      content: "Transaction sent successfully",
    })
  );
}

export function* sendTransactionFailureHandler({ payload }) {
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

export function* clearCartHandler() {
  try {
    yield put(
      cartActions.cartIsDiscountAppliedSetter(
        CART_INITIAL_STATE.isDiscountApplied
      )
    );

    yield put(cartActions.cartProductsSetter(CART_INITIAL_STATE.products));

    yield put(
      cartActions.cartTotalPriceBeforeDiscountSetter(
        CART_INITIAL_STATE.totalPriceBeforeDiscount
      )
    );

    yield put(
      cartActions.cartTotalPriceAfterDiscountSetter(
        CART_INITIAL_STATE.totalPriceAfterDiscount
      )
    );

    yield put(
      loadingActions.loadingIsloadingSetter(LOADING_INITIAL_STATE.isLoading)
    );
  } catch (error) {
    yield put(
      messageQueueActions.messagequeueAddMessage({
        type: "error",
        content: "error clearing cart",
      })
    );
  }
}
