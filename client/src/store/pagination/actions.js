import * as types from "./types";

export const newStatePagination = (payload) => {
  return {
    type: types.PAGINATION_NEW_STATE,
    payload: {
      currentPage: payload.page,
      totalPages: payload.totalPages,
    },
  };
};

export const resetStatePagination = () => {
  return {
    type: types.PAGINATION_RESET_STATE,
  };
};
