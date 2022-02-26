import * as types from "./types";

export const messagequeueMessagequeueSetter = (payload) => ({
  type: types.MESSAGEQUEUE_MESSAGEQUEUE_SETTER,
  payload,
});

export const messagequeueAddMessage = (payload) => ({
  type: types.MESSAGEQUEUE_ADDMESSAGE,
  payload,
});
