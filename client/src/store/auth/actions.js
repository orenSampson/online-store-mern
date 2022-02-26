import * as types from "./types";
import { AUTH_INITIAL_STATE } from "./reducers";

export const authIsLoggedinSetter = (payload) => ({
  type: types.AUTH_ISLOGGEDIN_SETTER,
  payload,
});

export const authLoggedUserEmailSetter = (payload) => ({
  type: types.AUTH_LOGGEDUSEREMAIL_SETTER,
  payload,
});

export const authEmailSetter = (payload) => ({
  type: types.AUTH_EMAIL_SETTER,
  payload,
});

export const authEmailErrorSetter = (payload) => ({
  type: types.AUTH_EMAIL_ERROR_SETTER,
  payload,
});

export const authPasswordSetter = (payload) => ({
  type: types.AUTH_PASSWORD_SETTER,
  payload,
});

export const authPasswordErrorSetter = (payload) => ({
  type: types.AUTH_PASSWORD_ERROR_SETTER,
  payload,
});

export const authIsLoggedinReset = () => ({
  type: types.AUTH_ISLOGGEDIN_SETTER,
  payload: AUTH_INITIAL_STATE.isLoggedin,
});

export const authLoggedUserEmailReset = () => ({
  type: types.AUTH_LOGGEDUSEREMAIL_SETTER,
  payload: AUTH_INITIAL_STATE.loggedUserEmail,
});

export const authEmailReset = () => ({
  type: types.AUTH_EMAIL_SETTER,
  payload: AUTH_INITIAL_STATE.email,
});

export const authEmailErrorReset = () => ({
  type: types.AUTH_EMAIL_ERROR_SETTER,
  payload: AUTH_INITIAL_STATE.emailError,
});

export const authPasswordReset = () => ({
  type: types.AUTH_PASSWORD_SETTER,
  payload: AUTH_INITIAL_STATE.password,
});

export const authPasswordErrorReset = () => ({
  type: types.AUTH_PASSWORD_ERROR_SETTER,
  payload: AUTH_INITIAL_STATE.passwordError,
});

export const authLoginSignup = (payload) => ({
  type: types.AUTH_LOGIN_SIGNUP,
  payload,
});

export const authLogout = () => ({
  type: types.AUTH_LOGOUT,
});

export const authCheckIfLoggedIn = () => ({
  type: types.CHECKIFLOGGEDIN,
});

export const authLoginSuccess = (payload) => ({
  type: types.AUTH_LOGIN_SUCCESS,
  payload,
});

export const authSignupSuccess = () => ({
  type: types.AUTH_SIGNUP_SUCCESS,
});

export const authFailure = (payload) => ({
  type: types.AUTH_FAILURE,
  payload,
});
