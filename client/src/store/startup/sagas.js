import { put } from "redux-saga/effects";

import { authCheckIfLoggedIn } from "../auth/actions";
import * as cartActions from "../cart/actions";
import * as categoriesActions from "../categories/actions";

export function* startupHandler() {
  //check if logged in
  yield put(authCheckIfLoggedIn());

  //retrive discounts
  yield put(cartActions.cartGetDiscounts());

  //retrive categories
  yield put(categoriesActions.getCategories());
}
