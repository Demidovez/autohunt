import Actions from "../actions/types/userActionTypes";

const initialState = {
  firstname: null,
  lastname: null,
  userId: null,
  isLogined: false,
  isActive: true,
  role: "GUEST",
  filters: [],
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
    case Actions.SET_FILTERS:
      return {
        ...state,
        filters: action.payload.map((filter) => ({
          ...filter,
          filterOptions: JSON.parse(filter.filterOptions),
          tags: JSON.parse(filter.tags),
        })),
      };
    case Actions.UPDATE_FILTER:
      return {
        ...state,
        filters: state.filters.map((filter) =>
          filter.id === action.payload.id ? action.payload : filter
        ),
      };
    case Actions.REMOVE_FILTER:
      return {
        ...state,
        filters: state.filters.filter((filter) => filter.id !== action.payload),
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
