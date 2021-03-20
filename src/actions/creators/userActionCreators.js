import Actions from "../types/userActionTypes";

export const onSaveFilterToUserAction = (
  userId,
  nameOptions,
  filterOptions
) => ({
  type: Actions.SAVE_FILTER_OPTIONS,
  payload: { userId, nameOptions, filterOptions },
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
