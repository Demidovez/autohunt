import { all } from "redux-saga/effects";
import filterBarSagas from "./filterBarSagas";
import modelAutoNamesSagas from "./modelAutoNamesSagas";
import newsSagas from "./newsSagas";

function* rootSaga() {
  yield all([filterBarSagas(), modelAutoNamesSagas(), newsSagas()]);
}

export default rootSaga;
