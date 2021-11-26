import { call, put } from "redux-saga/effects";

import * as categoriesActions from "./actions";
import * as messageQueueActions from "../messageQueue/actions";
import { CATEGORIES_INITIAL_STATE } from "./reducers";
import { requestGetCategories } from "../../api/categoriesAPI";
import * as messages from "../constants/messages";

export function* getCategoriesHandler() {
  try {
    yield put(
      categoriesActions.categories_isloading_setter(
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

    yield put(categoriesActions.get_categories_success(data));
  } catch (error) {
    const err =
      error.message ||
      error.response?.data?.message ||
      messages.API_CALL_FAILED;
    yield put(categoriesActions.get_categories_failure(err));
  }
}

export function* getCategoriesSuccessHandler({ payload }) {
  yield put(
    categoriesActions.categories_isloading_setter(
      CATEGORIES_INITIAL_STATE.isLoading
    )
  );

  yield put(categoriesActions.categories_categories_setter(payload));
}

export function* getCategoriesfailureHandler({ payload }) {
  yield put(
    categoriesActions.categories_isloading_setter(
      CATEGORIES_INITIAL_STATE.isLoading
    )
  );

  yield put(
    messageQueueActions.messagequeue_addMessage({
      type: "error",
      content: payload,
    })
  );
}
