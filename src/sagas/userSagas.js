import { put, call, takeEvery } from "redux-saga/effects";
import Actions from "../actions/types/userActionTypes";
import {
  getFilters,
  removeSavedFilter,
  saveFilter,
  tryLoginUser,
  trySignUser,
  updateSavedFilter,
} from "../api";
import {
  logoutUserAction,
  setFiltersAction,
  setUserAction,
} from "../actions/creators/userActionCreators";
import {
  setIsSavingFilterAction,
  setSaveFilterSuccessAction,
} from "../actions/creators/filterBarActionCreators";

// TODO: Нужно учесть все возможные ошибки

function* workerTryLogin(action) {
  const user = yield call(tryLoginUser, action.payload);

  if (user.isActive) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  yield put(setUserAction(user));
}

function* workerTrySignin(action) {
  const user = yield call(trySignUser, action.payload);

  if (user.isActive) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  yield put(setUserAction(user));
}

function* workerCheckIsLogined() {
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    yield put(setUserAction(user));
  } else {
    yield put(logoutUserAction());
  }
}

function* workerTryLogout() {
  localStorage.removeItem("user");
  yield put(logoutUserAction());
}

function* workerSaveFilter(action) {
  yield put(setIsSavingFilterAction(true));

  const isSavedFilter = yield call(saveFilter, action.payload);

  yield put(setSaveFilterSuccessAction(isSavedFilter));
}

function* workerGetFilters(action) {
  const filters = yield call(getFilters, action.payload);

  yield put(setFiltersAction(filters));
}

function* workerUpdateSavedFilter(action) {
  yield call(updateSavedFilter, action.payload);
}

function* workerRemoveSavedFilter(action) {
  yield call(removeSavedFilter, action.payload);
}

export default function* watcherSaga() {
  yield takeEvery(Actions.TRY_LOGIN, workerTryLogin);
  yield takeEvery(Actions.TRY_SIGNIN, workerTrySignin);
  yield takeEvery(Actions.TRY_LOGOUT, workerTryLogout);
  yield takeEvery(Actions.CHECK_IS_LOGINED, workerCheckIsLogined);
  yield takeEvery(Actions.SAVE_FILTER_OPTIONS, workerSaveFilter);
  yield takeEvery(Actions.GET_FILTERS, workerGetFilters);
  yield takeEvery(Actions.UPDATE_FILTER, workerUpdateSavedFilter);
  yield takeEvery(Actions.REMOVE_FILTER, workerRemoveSavedFilter);
}
