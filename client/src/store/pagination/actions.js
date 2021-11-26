import * as types from "./types";

export const new_state_pagination = (payload) => {
  return {
    type: types.PAGINATION_NEW_STATE,
    payload: {
      currentPage: payload.page,
      totalPages: payload.totalPages,
      isLastPage: !(payload.page < payload.totalPages),
    },
  };
};

export const reset_state_pagination = () => {
  return {
    type: types.PAGINATION_RESET_STATE,
  };
};
