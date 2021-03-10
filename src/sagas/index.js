import { all } from "redux-saga/effects";
import filterBarSagas from "./filterBarSagas";
import modelAutoNamesSagas from "./modelAutoNamesSagas";
import newsSagas from "./newsSagas";
import userSagas from "./userSagas";

function* rootSaga() {
  yield all([
    filterBarSagas(),
    modelAutoNamesSagas(),
    newsSagas(),
    userSagas(),
  ]);
}

export default rootSaga;
