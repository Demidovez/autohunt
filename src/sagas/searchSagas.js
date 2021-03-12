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
} from "../actions/creators/searchActionCreators";

// TODO: Добавить try-catch
function* workerStartSearchByName(action) {
  const { adverts, count } = yield call(startSearch, "name", action.payload);

  yield put(setAdvertsByNameAction(adverts, count));
}

function* workerStartSearchByRubles(action) {
  const { adverts, count } = yield call(startSearch, "rubles", action.payload);

  yield put(setAdvertsByRublesAction(adverts, count));
}

function* workerStartSearchByDollars(action) {
  const { adverts, count } = yield call(startSearch, "dollars", action.payload);

  yield put(setAdvertsByDollarsAction(adverts, count));
}

function* workerStartSearchByMileage(action) {
  const { adverts, count } = yield call(startSearch, "mileage", action.payload);

  yield put(setAdvertsByMileageAction(adverts, count));
}

function* workerStartSearchByCity(action) {
  const { adverts, count } = yield call(startSearch, "city", action.payload);

  yield put(setAdvertsByCityAction(adverts, count));
}

function* workerStartSearchByOther(action) {
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
