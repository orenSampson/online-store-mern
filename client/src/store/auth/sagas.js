import { call, put } from "redux-saga/effects";
import { push } from "connected-react-router";

import * as authActions from "./actions";
import * as loadingActions from "../loading/actions";
import * as messageQueueActions from "../messageQueue/actions";
import * as cartActions from "../cart/actions";
import { requestAuth } from "../../api/authAPI";
import { TOKEN_NAME, LOGGED_USER_EMAIL } from "../constants/auth";
import { AUTH_INITIAL_STATE } from "./reducers";
import { LOADING_INITIAL_STATE } from "../loading/reducers";

export function* authLoginSignupHandler({ payload }) {
  try {
    yield put(
      loadingActions.loading_isloading_setter(!LOADING_INITIAL_STATE.isLoading)
    );

    const authObj = yield call(requestAuth, payload);

    if (payload.isLoginMode) {
      yield put(authActions.auth_login_success(authObj));
    } else {
      yield put(authActions.auth_signup_success());
    }
  } catch (error) {
    yield put(authActions.auth_failure(error.message));
  }
}

export function* authLogoutHandler() {
  yield localStorage.removeItem(TOKEN_NAME);
  yield localStorage.removeItem(LOGGED_USER_EMAIL);

  yield put(
    authActions.auth_loggedUserEmail_setter(AUTH_INITIAL_STATE.loggedUserEmail)
  );
  yield put(authActions.auth_isLoggedin_setter(AUTH_INITIAL_STATE.isLoggedin));

  yield put(cartActions.cart_clear_cart());

  yield put(
    messageQueueActions.messagequeue_addMessage({
      type: "success",
      content: "Logout successful",
    })
  );
}

export function* checkIfLoggedIn() {
  const token = yield localStorage.getItem(TOKEN_NAME);
  const loggedInUserEmail = yield localStorage.getItem(LOGGED_USER_EMAIL);

  if (token && loggedInUserEmail) {
    yield put(
      authActions.auth_login_success({ token, email: loggedInUserEmail })
    );
  }
}

export function* authLoginSuccessHandler(payload) {
  localStorage.setItem(TOKEN_NAME, payload.payload.token);
  localStorage.setItem(LOGGED_USER_EMAIL, payload.payload.email);

  yield put(authActions.auth_loggedUserEmail_setter(payload.payload.email));
  yield put(authActions.auth_isLoggedin_setter(!AUTH_INITIAL_STATE.isLoggedin));

  yield put(
    loadingActions.loading_isloading_setter(LOADING_INITIAL_STATE.isLoading)
  );

  yield put(push("/"));

  yield put(
    messageQueueActions.messagequeue_addMessage({
      type: "success",
      content: "Login successful",
    })
  );
}

export function* authSignupSuccessHandler() {
  yield put(
    loadingActions.loading_isloading_setter(LOADING_INITIAL_STATE.isLoading)
  );

  yield put(
    messageQueueActions.messagequeue_addMessage({
      type: "success",
      content: "Signup successful",
    })
  );
}

export function* authFailureHandler({ payload }) {
  yield put(
    loadingActions.loading_isloading_setter(LOADING_INITIAL_STATE.isLoading)
  );

  yield put(
    messageQueueActions.messagequeue_addMessage({
      type: "error",
      content: payload,
    })
  );
}
