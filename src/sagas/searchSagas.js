import { put, call, takeLatest } from "redux-saga/effects";
import Actions from "../actions/types/searchActionTypes";
import { startSearch } from "../api";
import {
  setAdvertsByCityAction,
  setAdvertsByDollarsAction,
  setAdvertsByMileageAction,
  setAdvertsByNameAction,
  setAdvertsByOtherAction,
  setAdvertsByRublesAction,
  setIsLoadingAction,
} from "../actions/creators/searchActionCreators";

// TODO: Дублирование кода в воркерах
// TODO: Добавить try-catch
function* workerStartSearchByName(action) {
  yield put(setIsLoadingAction("name"));

  const { adverts, count } = yield call(startSearch, "name", action.payload);

  yield put(setAdvertsByNameAction(adverts, count));
}

function* workerStartSearchByRubles(action) {
  yield put(setIsLoadingAction("rubles"));

  const { adverts, count } = yield call(startSearch, "rubles", action.payload);

  yield put(setAdvertsByRublesAction(adverts, count));
}

function* workerStartSearchByDollars(action) {
  yield put(setIsLoadingAction("dollars"));

  const { adverts, count } = yield call(startSearch, "dollars", action.payload);

  yield put(setAdvertsByDollarsAction(adverts, count));
}

function* workerStartSearchByMileage(action) {
  yield put(setIsLoadingAction("mileage"));

  const { adverts, count } = yield call(startSearch, "mileage", action.payload);

  yield put(setAdvertsByMileageAction(adverts, count));
}

function* workerStartSearchByCity(action) {
  yield put(setIsLoadingAction("city"));

  const { adverts, count } = yield call(startSearch, "city", action.payload);

  yield put(setAdvertsByCityAction(adverts, count));
}

function* workerStartSearchByOther(action) {
  yield put(setIsLoadingAction("other"));

  const { adverts, count } = yield call(startSearch, "other", action.payload);

  yield put(setAdvertsByOtherAction(adverts, count));
}

export default function* watcherSaga() {
  yield takeLatest(Actions.SEARCH_ADVERTS_BY_NAME, workerStartSearchByName);
  yield takeLatest(Actions.SEARCH_ADVERTS_BY_RUBLES, workerStartSearchByRubles);
  yield takeLatest(
    Actions.SEARCH_ADVERTS_BY_DOLLARS,
    workerStartSearchByDollars
  );
  yield takeLatest(
    Actions.SEARCH_ADVERTS_BY_MILEAGE,
    workerStartSearchByMileage
  );
  yield takeLatest(Actions.SEARCH_ADVERTS_BY_CITY, workerStartSearchByCity);
  yield takeLatest(Actions.SEARCH_ADVERTS_BY_OTHER, workerStartSearchByOther);
}
