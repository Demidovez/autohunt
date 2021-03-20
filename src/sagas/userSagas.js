import { put, call, takeEvery } from "redux-saga/effects";
import Actions from "../actions/types/userActionTypes";
import { saveFilter, tryLoginUser, trySignUser } from "../api";
import {
  logoutUserAction,
  setUserAction,
} from "../actions/creators/userActionCreators";
import {
  setIsSavingFilterAction,
  setSaveFilterSuccessAction,
} from "../actions/creators/filterBarActionCreators";

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

export default function* watcherSaga() {
  yield takeEvery(Actions.TRY_LOGIN, workerTryLogin);
  yield takeEvery(Actions.TRY_SIGNIN, workerTrySignin);
  yield takeEvery(Actions.TRY_LOGOUT, workerTryLogout);
  yield takeEvery(Actions.CHECK_IS_LOGINED, workerCheckIsLogined);
  yield takeEvery(Actions.SAVE_FILTER_OPTIONS, workerSaveFilter);
}
