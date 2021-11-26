import * as types from "./types";

export const general_showSideBar_setter = (payload) => ({
  type: types.GENERAL_SHOWSIDEBAR_SETTER,
  payload,
});

export const general_showBackDrop_setter = (payload) => ({
  type: types.GENERAL_SHOWBACKDROP_SETTER,
  payload,
});
