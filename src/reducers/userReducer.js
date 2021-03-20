import Actions from "../actions/types/userActionTypes";

const initialState = {
  firstname: null,
  lastname: null,
  userId: null,
  isLogined: false,
  isActive: true,
  role: "GUEST",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_USER:
      return {
        ...state,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        role: action.payload.role,
        isActive: action.payload.isActive,
        isLogined: action.payload.isActive,
        userId: action.payload.id,
      };
    case Actions.LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default userReducer;
