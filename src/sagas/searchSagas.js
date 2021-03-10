import { put, call, takeLatest } from "redux-saga/effects";
import Actions from "../actions/types/searchActionTypes";
import { startSearch } from "../api";
import { setFoundAdvertsAction } from "../actions/creators/searchActionCreators";

function* workerStartSearch(action) {
  if (action.payload.searchStr) {
    const { foundAdverts, count } = yield call(startSearch, action.payload);

    yield put(setFoundAdvertsAction(foundAdverts, count));
  } else {
    yield put(setFoundAdvertsAction([], 0));
  }
}

export default function* watcherSaga() {
  yield takeLatest(Actions.START_SEARCH, workerStartSearch);
}
