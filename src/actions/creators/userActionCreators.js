import Actions from "../types/userActionTypes";

// TODO: Много где нужно повторять список параметров. Может поменять на [...args]?
export const onSaveFilterToUserAction = (
  userId,
  nameOptions,
  filterOptions,
  tags
) => ({
  type: Actions.SAVE_FILTER_OPTIONS,
  payload: { userId, nameOptions, filterOptions, tags },
});

export const updateSavedFilterAction = (filter) => ({
  type: Actions.UPDATE_FILTER,
  payload: filter,
});

export const removeSavedFilterAction = (id) => ({
  type: Actions.REMOVE_FILTER,
  payload: id,
});

export const getFiltersAction = (userId) => ({
  type: Actions.GET_FILTERS,
  payload: userId,
});

export const setFiltersAction = (filters) => ({
  type: Actions.SET_FILTERS,
  payload: filters,
});

export const tryLoginUserAction = (loginValue) => ({
  type: Actions.TRY_LOGIN,
  payload: loginValue,
});

export const tryLogoutUserAction = () => ({
  type: Actions.TRY_LOGOUT,
});

export const trySigninUserAction = (signinValue) => ({
  type: Actions.TRY_SIGNIN,
  payload: signinValue,
});

export const logoutUserAction = () => ({
  type: Actions.LOGOUT,
});

export const setUserAction = (userInfo) => ({
  type: Actions.SET_USER,
  payload: userInfo,
});

export const checkIsLoginUserAction = () => ({
  type: Actions.CHECK_IS_LOGINED,
});
