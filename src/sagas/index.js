import { all } from "redux-saga/effects";
import filterBarSagas from "./filterBarSagas";
import modelAutoNamesSagas from "./modelAutoNamesSagas";
import newsSagas from "./newsSagas";
import userSagas from "./userSagas";
import searchSagas from "./searchSagas";

function* rootSaga() {
  yield all([
    filterBarSagas(),
    modelAutoNamesSagas(),
    newsSagas(),
    userSagas(),
    searchSagas(),
  ]);
}

export default rootSaga;
