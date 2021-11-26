import { put, select } from "redux-saga/effects";

import * as messageQueueActions from "../messageQueue/actions";

const messageQueueState = (state) => state.messageQueueReducers.messageQueue;

export function* addMessageHandler({ payload }) {
  const messageQueue = yield select(messageQueueState);

  yield put(
    messageQueueActions.messagequeue_messagequeue_setter([
      payload,
      ...messageQueue,
    ])
  );
}
