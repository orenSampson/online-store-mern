import clone from "lodash.clonedeep";

import * as types from "./types";

export const AUTH_INITIAL_STATE = {
  isLoggedin: false,
  loggedUserEmail: "",
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

    case types.AUTH_RESET_STATE:
      return {
        ...AUTH_INITIAL_STATE,
      };

    default:
      return { ...state };
  }
};

export default reducer;
