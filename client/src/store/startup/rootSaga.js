import { takeLatest } from "redux-saga/effects";

import * as startupTypes from "./types";
import * as startupSagas from "./sagas";

export const startupRootSagas = [
  takeLatest(startupTypes.STARTUP, startupSagas.startupHandler),
];
