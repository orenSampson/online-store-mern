import { takeLatest } from "redux-saga/effects";

import * as authTypes from "./types";
import * as authSagas from "./sagas";

export const authRootSagas = [
  takeLatest(authTypes.AUTH_LOGIN_SIGNUP, authSagas.authLoginSignupHandler),
  takeLatest(authTypes.AUTH_LOGOUT, authSagas.authLogoutHandler),
  takeLatest(authTypes.AUTH_LOGIN_SUCCESS, authSagas.authLoginSuccessHandler),
  takeLatest(authTypes.AUTH_SIGNUP_SUCCESS, authSagas.authSignupSuccessHandler),
  takeLatest(authTypes.AUTH_FAILURE, authSagas.authFailureHandler),
  takeLatest(authTypes.CHECKIFLOGGEDIN, authSagas.checkIfLoggedIn),
];
