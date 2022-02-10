import * as types from "./types";
import { AUTH_INITIAL_STATE } from "./reducers";

export const auth_isLoggedin_setter = (payload) => ({
  type: types.AUTH_ISLOGGEDIN_SETTER,
  payload,
});

export const auth_loggedUserEmail_setter = (payload) => ({
  type: types.AUTH_LOGGEDUSEREMAIL_SETTER,
  payload,
});

export const auth_email_setter = (payload) => ({
  type: types.AUTH_EMAIL_SETTER,
  payload,
});

export const auth_emailError_setter = (payload) => ({
  type: types.AUTH_EMAIL_ERROR_SETTER,
  payload,
});

export const auth_password_setter = (payload) => ({
  type: types.AUTH_PASSWORD_SETTER,
  payload,
});

export const auth_passwordError_setter = (payload) => ({
  type: types.AUTH_PASSWORD_ERROR_SETTER,
  payload,
});

export const auth_isLoggedin_reset = () => ({
  type: types.AUTH_ISLOGGEDIN_SETTER,
  payload: AUTH_INITIAL_STATE.isLoggedin,
});

export const auth_loggedUserEmail_reset = () => ({
  type: types.AUTH_LOGGEDUSEREMAIL_SETTER,
  payload: AUTH_INITIAL_STATE.loggedUserEmail,
});

export const auth_email_reset = () => ({
  type: types.AUTH_EMAIL_SETTER,
  payload: AUTH_INITIAL_STATE.email,
});

export const auth_emailError_reset = () => ({
  type: types.AUTH_EMAIL_ERROR_SETTER,
  payload: AUTH_INITIAL_STATE.emailError,
});

export const auth_password_reset = () => ({
  type: types.AUTH_PASSWORD_SETTER,
  payload: AUTH_INITIAL_STATE.password,
});

export const auth_passwordError_reset = () => ({
  type: types.AUTH_PASSWORD_ERROR_SETTER,
  payload: AUTH_INITIAL_STATE.passwordError,
});

export const auth_login_signup = (payload) => ({
  type: types.AUTH_LOGIN_SIGNUP,
  payload,
});

export const auth_logout = () => ({
  type: types.AUTH_LOGOUT,
});

export const auth_check_if_loggedIn = () => ({
  type: types.CHECKIFLOGGEDIN,
});

export const auth_login_success = (payload) => ({
  type: types.AUTH_LOGIN_SUCCESS,
  payload,
});

export const auth_signup_success = () => ({
  type: types.AUTH_SIGNUP_SUCCESS,
});

export const auth_failure = (payload) => ({
  type: types.AUTH_FAILURE,
  payload,
});
