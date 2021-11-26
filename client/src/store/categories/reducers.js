import clone from "lodash.clonedeep";

import * as types from "./types";

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
};

const reducer = (state = clone(CATEGORIES_INITIAL_STATE), action) => {
  switch (action.type) {
    case types.CATEGORIES_CATEGORIES_SETTER:
      return {
        ...state,
        categories: clone(action.payload),
      };

    case types.CATEGORIES_ISLOADING_SETTER:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
