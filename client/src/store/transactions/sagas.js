import { call, put } from "redux-saga/effects";

import * as loadingActions from "../loading/actions";
import { LOADING_INITIAL_STATE } from "../loading/reducers";
import * as transactionsActions from "../transactions/actions";
import * as messageQueueActions from "../messageQueue/actions";
import { requestGetTransactions } from "../../api/transactionsAPI";
import * as messages from "../constants/messages";
import { TOKEN_NAME } from "../constants/auth";

export function* getTransactionsHandler() {
  try {
    yield put(
      loadingActions.loading_isloading_setter(!LOADING_INITIAL_STATE.isLoading)
    );

    const token = localStorage.getItem(TOKEN_NAME);

    if (!token) {
      throw new Error(messages.NOT_LOGGED_IN_TRANSACTIONS_HISTORY);
    }

    const { data } = yield call(requestGetTransactions, token);

    if (!data?.length) {
      throw new Error(messages.TRANSACTIONS_ARRAY_EMPTY);
    }

    yield put(
      loadingActions.loading_isloading_setter(LOADING_INITIAL_STATE.isLoading)
    );

    yield put(transactionsActions.transactions_transactions_setter(data));
  } catch (error) {
    yield put(
      loadingActions.loading_isloading_setter(LOADING_INITIAL_STATE.isLoading)
    );

    messageQueueActions.messagequeue_addMessage({
      type: "error",
      content: error.message,
    });
  }
}
