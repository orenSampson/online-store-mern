import { takeLatest } from "redux-saga/effects";

import * as messageQueueTypes from "./types";
import * as messageQueueSagas from "./sagas";

export const messageQueueRootSagas = [
  takeLatest(
    messageQueueTypes.MESSAGEQUEUE_ADDMESSAGE,
    messageQueueSagas.addMessageHandler
  ),
];
