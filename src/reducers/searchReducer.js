import Actions from "../actions/types/searchActionTypes";

const initialState = {
  foundAdverts: [],
  count: 0,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_FOUND_ADVERTS:
      return {
        ...state,
        foundAdverts: action.payload.foundAdverts,
        count: action.payload.count,
      };
    default:
      return state;
  }
};

export default searchReducer;
