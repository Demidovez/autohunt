import Actions from "../types/newsActionTypes";

export const getAllNewsAction = (options) => ({
  type: Actions.GET_ALL_NEWS,
  payload: options,
});

export const setAllNewsAction = (news, count) => ({
  type: Actions.SET_ALL_NEWS,
  payload: { news, count },
});

export const getMoreNewsAction = (options) => ({
  type: Actions.GET_MORE_NEWS,
  payload: options,
});

export const setMoreNewsAction = (moreNews) => ({
  type: Actions.SET_MORE_NEWS,
  payload: moreNews,
});
