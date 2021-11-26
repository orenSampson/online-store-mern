import { put } from "redux-saga/effects";

import * as authActions from "../auth/actions";
import * as cartActions from "../cart/actions";
import * as categoriesActions from "../categories/actions";

export function* startupHandler() {
  //check if logged in
  yield put(authActions.auth_check_if_loggedIn());

  //retrive discounts
  yield put(cartActions.cart_get_discounts());

  //retrive categories
  yield put(categoriesActions.get_categories());
}
