import * as types from "./types";

export const transactionsTransactionsSetter = (payload) => ({
  type: types.TRANSACTIONS_TRANSACTIONS_SETTER,
  payload,
});

export const transactionsGetTransactions = () => ({
  type: types.TRANSACTIONS_GET_TRANSACTIONS,
});

export const transactionsResetState = () => ({
  type: types.TRANSACTIONS_RESET_STATE,
});
