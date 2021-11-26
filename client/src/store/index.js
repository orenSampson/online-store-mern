import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";

import { watcherSaga } from "./rootSaga";
import authReducers from "./auth/reducers";
import cartReducers from "./cart/reducers";
import categoriesReducers from "./categories/reducers";
import paginationReducers from "./pagination/reducers";
import productsReducers from "./products/reducers";
import loadingReducers from "./loading/reducers";
import messageQueueReducers from "./messageQueue/reducers";
import transactionsReducers from "./transactions/reducers";
import generalReducers from "./general/reducers";

export const history = createBrowserHistory();

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    authReducers,
    cartReducers,
    categoriesReducers,
    paginationReducers,
    productsReducers,
    loadingReducers,
    messageQueueReducers,
    transactionsReducers,
    generalReducers,
  });

export default function configureStore(preloadedState) {
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history), sagaMiddleware];
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancer(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(watcherSaga);

  return store;
}
