import { put, call, takeEvery } from "redux-saga/effects";
import Actions from "../actions/types/modelAutoNamesActionTypes";
import {
  setAllModelsAction,
  setAllSeriesOfModelAction,
  setAllGenerationsOfSeriesAction,
  setAllColorNamesAction,
  setAllFuelNamesAction,
  setAllCarcaseNamesAction,
} from "../actions/creators/modelAutoNamesActionCreators";
import { getOptionCarNames, getSeries, getGenerations } from "../api";

function* workerGetOptionCarNames() {
  const { models, carcases, fuels, colors } = yield call(getOptionCarNames);
  yield put(setAllModelsAction(models));
  yield put(setAllCarcaseNamesAction(carcases));
  yield put(setAllFuelNamesAction(fuels));
  yield put(setAllColorNamesAction(colors));
}

function* workerGetSeries(action) {
  const { series } = yield call(getSeries, action.payload);
  yield put(setAllSeriesOfModelAction({ model: action.payload, series }));
}

function* workerGetGenerations(action) {
  const { generations } = yield call(getGenerations, action.payload);
  yield put(
    setAllGenerationsOfSeriesAction({
      model: action.payload.model,
      series: action.payload.series,
      generations,
    })
  );
}

export default function* watcherSaga() {
  yield takeEvery(Actions.GET_ALL_OPTION_CAR_NAMES, workerGetOptionCarNames);
  yield takeEvery(Actions.GET_ALL_SERIES_OF_MODEL, workerGetSeries);
  yield takeEvery(Actions.GET_ALL_GENERATION_OF_SERIES, workerGetGenerations);
}
