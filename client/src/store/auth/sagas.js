import { call, put } from "redux-saga/effects";
import { push } from "connected-react-router";

import {
  loginSuccess,
  signupSuccess,
  failure,
  isLoggedinSetter,
  loggedUserEmailSetter,
} from "./actions";
import * as loadingActions from "../loading/actions";
import * as messageQueueActions from "../messageQueue/actions";
import * as cartActions from "../cart/actions";
import * as transactionsActions from "../transactions/actions";
import { requestAuth } from "../../api/authAPI";
import { TOKEN_NAME, LOGGED_USER_EMAIL } from "../constants/auth";
import { AUTH_INITIAL_STATE } from "./reducers";
import { LOADING_INITIAL_STATE } from "../loading/reducers";

export function* authLoginSignupHandler({ payload }) {
  try {
    yield put(
      loadingActions.loadingIsloadingSetter(!LOADING_INITIAL_STATE.isLoading)
    );

    const authObj = yield call(requestAuth, payload);

    if (payload.isLoginMode) {
      yield put(loginSuccess(authObj));
    } else {
      yield put(signupSuccess());
    }
  } catch (error) {
    yield put(failure(error.message));
  }
}

export function* authLogoutHandler() {
  yield localStorage.removeItem(TOKEN_NAME);
  yield localStorage.removeItem(LOGGED_USER_EMAIL);

  yield put(loggedUserEmailSetter(AUTH_INITIAL_STATE.loggedUserEmail));
  yield put(isLoggedinSetter(AUTH_INITIAL_STATE.isLoggedin));

  yield put(cartActions.cartClearCart());

  yield put(transactionsActions.transactionsResetState());

  yield put(
    messageQueueActions.messagequeueAddMessage({
      type: "success",
      content: "Logout successful",
    })
  );
}

export function* checkIfLoggedIn() {
  const token = yield localStorage.getItem(TOKEN_NAME);
  const loggedInUserEmail = yield localStorage.getItem(LOGGED_USER_EMAIL);

  if (token && loggedInUserEmail) {
    yield put(loginSuccess({ token, email: loggedInUserEmail }));
  }
}

export function* authLoginSuccessHandler(payload) {
  localStorage.setItem(TOKEN_NAME, payload.payload.token);
  localStorage.setItem(LOGGED_USER_EMAIL, payload.payload.email);

  yield put(loggedUserEmailSetter(payload.payload.email));
  yield put(isLoggedinSetter(!AUTH_INITIAL_STATE.isLoggedin));

  yield put(
    loadingActions.loadingIsloadingSetter(LOADING_INITIAL_STATE.isLoading)
  );

  yield put(push("/"));

  yield put(
    messageQueueActions.messagequeueAddMessage({
      type: "success",
      content: "Login successful",
    })
  );
}

export function* authSignupSuccessHandler() {
  yield put(
    loadingActions.loadingIsloadingSetter(LOADING_INITIAL_STATE.isLoading)
  );

  yield put(
    messageQueueActions.messagequeueAddMessage({
      type: "success",
      content: "Signup successful",
    })
  );
}

export function* authFailureHandler({ payload }) {
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
