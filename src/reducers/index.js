import { combineReducers } from "redux";
import filterBarReducer from "../reducers/filterBarReducer";
import modelAutoNamesReducer from "../reducers/modelAutoNamesReducer";
import userReducer from "../reducers/userReducer";

const rootReducer = combineReducers({
  filterBar: filterBarReducer,
  optionCarNames: modelAutoNamesReducer,
  user: userReducer,
});

export default rootReducer;
