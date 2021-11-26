import * as types from "./types";

export const messagequeue_messagequeue_setter = (payload) => ({
  type: types.MESSAGEQUEUE_MESSAGEQUEUE_SETTER,
  payload,
});

export const messagequeue_addMessage = (payload) => ({
  type: types.MESSAGEQUEUE_ADDMESSAGE,
  payload,
});
