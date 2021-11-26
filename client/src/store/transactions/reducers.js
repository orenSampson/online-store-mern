import clone from "lodash.clonedeep";

import * as types from "./types";

export const TRANSACTIONS_INITIAL_STATE = {
  transactions: [],
};

const reducer = (state = clone(TRANSACTIONS_INITIAL_STATE), action) => {
  switch (action.type) {
    case types.TRANSACTIONS_TRANSACTIONS_SETTER:
      return {
        ...state,
        transactions: clone(action.payload),
      };

    case types.TRANSACTIONS_RESET_STATE:
      return clone(TRANSACTIONS_INITIAL_STATE);

    default:
      return { ...state };
  }
};

export default reducer;
