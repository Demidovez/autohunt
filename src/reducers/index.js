import { combineReducers } from "redux";
import filterBarReducer from "../reducers/filterBarReducer";
import modelAutoNamesReducer from "../reducers/modelAutoNamesReducer";
import userReducer from "../reducers/userReducer";
import newsReducer from "./newsReducer";

const rootReducer = combineReducers({
  filterBar: filterBarReducer,
  optionCarNames: modelAutoNamesReducer,
  user: userReducer,
  news: newsReducer,
});

export default rootReducer;
