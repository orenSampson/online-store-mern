import { call, put } from "redux-saga/effects";

import * as categoriesActions from "./actions";
import * as messageQueueActions from "../messageQueue/actions";
import { CATEGORIES_INITIAL_STATE } from "./reducers";
import { requestGetCategories } from "../../api/categoriesAPI";
import * as messages from "../constants/messages";

export function* getCategoriesHandler() {
  try {
    yield put(
      categoriesActions.categoriesIsloadingSetter(
        !CATEGORIES_INITIAL_STATE.isLoading
      )
    );

    let { data } = yield call(requestGetCategories);

    if (!data) {
      throw new Error(messages.CATEGORIES_ARRAY_EMPTY);
    }

    data = data.map((category) => {
      return category.category;
    });

    yield put(categoriesActions.getCategoriesSuccess(data));
  } catch (error) {
    const err =
      error.message ||
      error.response?.data?.message ||
      messages.API_CALL_FAILED;
    yield put(categoriesActions.getCategoriesFailure(err));
  }
}

export function* getCategoriesSuccessHandler({ payload }) {
  yield put(
    categoriesActions.categoriesIsloadingSetter(
      CATEGORIES_INITIAL_STATE.isLoading
    )
  );

  yield put(categoriesActions.categoriesCategoriesSetter(payload));
}

export function* getCategoriesfailureHandler({ payload }) {
  yield put(
    categoriesActions.categoriesIsloadingSetter(
      CATEGORIES_INITIAL_STATE.isLoading
    )
  );

  yield put(
    messageQueueActions.messagequeueAddMessage({
      type: "error",
      content: payload,
    })
  );
}
