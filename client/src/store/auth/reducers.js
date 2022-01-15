import clone from "lodash.clonedeep";

import * as types from "./types";

export const AUTH_INITIAL_STATE = {
  isLoggedin: false,
  loggedUserEmail: "",
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
};

const reducer = (state = clone(AUTH_INITIAL_STATE), action) => {
  switch (action.type) {
    case types.AUTH_ISLOGGEDIN_SETTER:
      return {
        ...state,
        isLoggedin: action.payload,
      };

    case types.AUTH_LOGGEDUSEREMAIL_SETTER:
      return {
        ...state,
        loggedUserEmail: action.payload,
      };

    case types.AUTH_EMAIL_SETTER:
      return {
        ...state,
        email: action.payload,
      };

    case types.AUTH_EMAIL_ERROR_SETTER:
      return {
        ...state,
        emailError: action.payload,
      };

    case types.AUTH_PASSWORD_SETTER:
      return {
        ...state,
        password: action.payload,
      };

    case types.AUTH_PASSWORD_ERROR_SETTER:
      return {
        ...state,
        passwordError: action.payload,
      };

    case types.AUTH_RESET_STATE:
      return {
        ...AUTH_INITIAL_STATE,
      };

    default:
      return { ...state };
  }
};

export default reducer;
