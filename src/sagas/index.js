import { all } from "redux-saga/effects";

import filterBarSagas from "./filterBarSagas";
import modelAutoNamesSagas from "./modelAutoNamesSagas";

function* rootSaga() {
  yield all([filterBarSagas(), modelAutoNamesSagas()]);
}

export default rootSaga;
