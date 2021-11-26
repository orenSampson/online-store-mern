import { all } from "redux-saga/effects";

import { authRootSagas } from "./auth/rootSaga";
import { cartRootSagas } from "./cart/rootSaga";
import { categoriesRootSagas } from "./categories/rootSaga";
import { productsRootSagas } from "./products/rootSaga";
import { startupRootSagas } from "./startup/rootSaga";
import { transactionsRootSagas } from "./transactions/rootSaga";
import { messageQueueRootSagas } from "./messageQueue/rootSaga";

export function* watcherSaga() {
  yield all([
    ...authRootSagas,
    ...cartRootSagas,
    ...categoriesRootSagas,
    ...productsRootSagas,
    ...startupRootSagas,
    ...transactionsRootSagas,
    ...messageQueueRootSagas,
  ]);
}
