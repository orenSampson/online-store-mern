import * as types from "./types";

export const generalShowSideBarSetter = (payload) => ({
  type: types.GENERAL_SHOWSIDEBAR_SETTER,
  payload,
});

export const generalShowBackDropSetter = (payload) => ({
  type: types.GENERAL_SHOWBACKDROP_SETTER,
  payload,
});
