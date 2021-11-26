import clone from "lodash.clonedeep";
import * as types from "./types";

export const MESSAGEQUEUE_INITIAL_STATE = {
  messageQueue: [],
};

const reducer = (state = clone(MESSAGEQUEUE_INITIAL_STATE), action) => {
  switch (action.type) {
    case types.MESSAGEQUEUE_MESSAGEQUEUE_SETTER:
      return {
        ...state,
        messageQueue: clone(action.payload),
      };

    default:
      return { ...state };
  }
};

export default reducer;
