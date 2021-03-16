import { put, call, takeLatest } from "redux-saga/effects";
import Actions from "../actions/types/searchActionTypes";
import { startSearchBy } from "../api";
import {
  setAdvertsAction,
  setIsLoadingAction,
  setAdvertsByKeyAction,
} from "../actions/creators/searchActionCreators";

// TODO: Дублирование кода в воркерах
// TODO: Добавить try-catch
function* workerStartSearch(action) {
  yield put(setIsLoadingAction());

  const data = yield call(startSearchBy, action.payload);

  yield put(setAdvertsAction(data));
}

function* workerStartSearchByKey(action) {
  yield put(setIsLoadingAction());

  const data = yield call(startSearchBy, action.payload.by, action.payload);

  yield put(setAdvertsByKeyAction(data));
}

export default function* watcherSaga() {
  yield takeLatest(Actions.SEARCH_ADVERTS, workerStartSearch);
  yield takeLatest(
    // TODO: Может лучше объединеить в один экшентип?
    [
      Actions.SEARCH_ADVERTS_BY_NAME,
      Actions.SEARCH_ADVERTS_BY_RUBLES,
      Actions.SEARCH_ADVERTS_BY_DOLLARS,
      Actions.SEARCH_ADVERTS_BY_MILEAGE,
      Actions.SEARCH_ADVERTS_BY_CITY,
      Actions.SEARCH_ADVERTS_BY_OTHER,
    ],
    workerStartSearchByKey
  );
}
