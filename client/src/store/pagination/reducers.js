import clone from "lodash.clonedeep";

import * as types from "./types";

const PAGINATION_INITIAL_STATE = {
  currentPage: 1,
  totalPages: 0,
};

const reducer = (state = clone(PAGINATION_INITIAL_STATE), action) => {
  switch (action.type) {
    case types.PAGINATION_NEW_STATE:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };

    case types.PAGINATION_RESET_STATE:
      return {
        ...clone(PAGINATION_INITIAL_STATE),
      };

    default:
      return { ...state };
  }
};

export default reducer;
