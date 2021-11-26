import clone from "lodash.clonedeep";

import * as types from "./types";

export const LOADING_INITIAL_STATE = {
  isLoading: false,
};

const reducer = (state = clone(LOADING_INITIAL_STATE), action) => {
  switch (action.type) {
    case types.LOADING_ISLOADING_SETTER:
      return {
        ...state,
        isLoading: action.payload,
      };

    case types.LOADING_RESET_STATE:
      return {
        ...clone(LOADING_INITIAL_STATE),
      };

    default:
      return { ...state };
  }
};

export default reducer;
