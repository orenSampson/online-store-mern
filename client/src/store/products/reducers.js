import clone from "lodash.clonedeep";

import * as types from "./types";
import { ALL_PRODUCTS } from "../../constants/products";

const PRODUCTS_INITIAL_STATE = {
  products: [],
  category: ALL_PRODUCTS,
};

const reducer = (state = clone(PRODUCTS_INITIAL_STATE), action) => {
  switch (action.type) {
    case types.PRODUCTS_PRODUCTS_SETTER:
      return {
        ...state,
        products: clone(action.payload),
      };

    case types.PRODUCTS_CATEGORY_SETTER:
      return {
        ...state,
        category: action.payload,
      };

    case types.PRODUCTS_RESET_STATE:
      return {
        ...clone(PRODUCTS_INITIAL_STATE),
      };

    default:
      return { ...state };
  }
};

export default reducer;
