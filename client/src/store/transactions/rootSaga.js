import { takeLatest } from "redux-saga/effects";

import * as transactionsTypes from "./types";
import * as transactionsSagas from "./sagas";

export const transactionsRootSagas = [
  takeLatest(
    transactionsTypes.TRANSACTIONS_GET_TRANSACTIONS,
    transactionsSagas.getTransactionsHandler
  ),
];
