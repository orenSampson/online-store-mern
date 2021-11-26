import * as types from "./types";

export const auth_isLoggedin_setter = (payload) => ({
  type: types.AUTH_ISLOGGEDIN_SETTER,
  payload,
});

export const auth_loggedUserEmail_setter = (payload) => ({
  type: types.AUTH_LOGGEDUSEREMAIL_SETTER,
  payload,
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
