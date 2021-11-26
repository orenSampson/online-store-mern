import clone from "lodash.clonedeep";

import * as types from "./types";

export const GENERAL_INITIAL_STATE = {
  showSideBar: false,
  showBackDrop: false,
};

const reducer = (state = clone(GENERAL_INITIAL_STATE), action) => {
  switch (action.type) {
    case types.GENERAL_SHOWSIDEBAR_SETTER:
      return {
        ...state,
        showSideBar: action.payload,
      };

    case types.GENERAL_SHOWBACKDROP_SETTER:
      return {
        ...state,
        showBackDrop: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
