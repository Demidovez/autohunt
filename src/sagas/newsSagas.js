import { put, call, takeEvery } from "redux-saga/effects";
import Actions from "../actions/types/newsActionTypes";
import { getNews } from "../api";
import {
  setAllNewsAction,
  setMoreNewsAction,
} from "../actions/creators/newsActionCreators";

function* workerGetNews(action) {
  const { news, count } = yield call(getNews, action.payload);
  yield put(setAllNewsAction(news, count));
}

function* workerGetMoreNews(action) {
  const { news } = yield call(getNews, action.payload);
  yield put(setMoreNewsAction(news));
}

export default function* watcherSaga() {
  yield takeEvery(Actions.GET_ALL_NEWS, workerGetNews);
  yield takeEvery(Actions.GET_MORE_NEWS, workerGetMoreNews);
}
