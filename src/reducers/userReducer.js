import Actions from "../actions/types/userActionTypes";

const initialState = {
  name: null,
  isLogined: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ALL_MODELS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userReducer;
