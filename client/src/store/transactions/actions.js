import * as types from "./types";

export const transactions_transactions_setter = (payload) => ({
  type: types.TRANSACTIONS_TRANSACTIONS_SETTER,
  payload,
});

export const transactions_get_transactions = () => ({
  type: types.TRANSACTIONS_GET_TRANSACTIONS,
});
