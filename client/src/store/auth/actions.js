import * as types from "./types";
import { AUTH_INITIAL_STATE } from "./reducers";

export const isLoggedinSetter = (payload) => ({
  type: types.AUTH_ISLOGGEDIN_SETTER,
  payload,
});

export const loggedUserEmailSetter = (payload) => ({
  type: types.AUTH_LOGGEDUSEREMAIL_SETTER,
  payload,
});

export const emailSetter = (payload) => ({
  type: types.AUTH_EMAIL_SETTER,
  payload,
});

export const emailErrorSetter = (payload) => ({
  type: types.AUTH_EMAIL_ERROR_SETTER,
  payload,
});

export const passwordSetter = (payload) => ({
  type: types.AUTH_PASSWORD_SETTER,
  payload,
});

export const passwordErrorSetter = (payload) => ({
  type: types.AUTH_PASSWORD_ERROR_SETTER,
  payload,
});

export const isLoggedinReset = () => ({
  type: types.AUTH_ISLOGGEDIN_SETTER,
  payload: AUTH_INITIAL_STATE.isLoggedin,
});

export const loggedUserEmailReset = () => ({
  type: types.AUTH_LOGGEDUSEREMAIL_SETTER,
  payload: AUTH_INITIAL_STATE.loggedUserEmail,
});

export const emailReset = () => ({
  type: types.AUTH_EMAIL_SETTER,
  payload: AUTH_INITIAL_STATE.email,
});

export const emailErrorReset = () => ({
  type: types.AUTH_EMAIL_ERROR_SETTER,
  payload: AUTH_INITIAL_STATE.emailError,
});

export const passwordReset = () => ({
  type: types.AUTH_PASSWORD_SETTER,
  payload: AUTH_INITIAL_STATE.password,
});

export const passwordErrorReset = () => ({
  type: types.AUTH_PASSWORD_ERROR_SETTER,
  payload: AUTH_INITIAL_STATE.passwordError,
});

export const loginSignup = (payload) => ({
  type: types.AUTH_LOGIN_SIGNUP,
  payload,
});

export const logout = () => ({
  type: types.AUTH_LOGOUT,
});

export const checkIfLoggedIn = () => ({
  type: types.CHECKIFLOGGEDIN,
});

export const loginSuccess = (payload) => ({
  type: types.AUTH_LOGIN_SUCCESS,
  payload,
});

export const signupSuccess = () => ({
  type: types.AUTH_SIGNUP_SUCCESS,
});

export const failure = (payload) => ({
  type: types.AUTH_FAILURE,
  payload,
});
