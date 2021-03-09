import { put, call, takeEvery } from "redux-saga/effects";
import Actions from "../actions/types/filterBarActionTypes";
import {
  setAdvertsAction,
  setMoreAdvertsAction,
} from "../actions/creators/filterBarActionCreators";
import { getAdverts } from "../api";

function* workerGetAdverts(action) {
  const { adverts, count } = yield call(getAdverts, action.payload);
  yield put(setAdvertsAction(adverts, count));
}

function* workerGetMoreAdverts(action) {
  const { adverts } = yield call(getAdverts, {
    ...action.payload.filterOptions,
    offset: action.payload.offset + action.payload.filterOptions.offsetStep,
  });
  yield put(setMoreAdvertsAction(adverts));
}

export default function* watcherSaga() {
  yield takeEvery(Actions.GET_ADVERTS, workerGetAdverts);
  yield takeEvery(Actions.GET_MORE_ADVERTS, workerGetMoreAdverts);
}
