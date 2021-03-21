import Actions from "../actions/types/userActionTypes";

const initialState = {
  firstname: null,
  lastname: null,
  userId: null,
  isLogined: false,
  isActive: true,
  role: "GUEST",
  filters: [],
  isFoundAutoLoading: false,
  foundAutoItems: [],
  foundAutoItemsCount: 0,
  filterColors: [
    "#f44336",
    "#9c27b0",
    "#3f51b5",
    "#4caf50",
    "#ffeb3b",
    "#ff9800",
    "#795548",
    "#607d8b",
    "#000000",
    "#7c8285",
    "#bfbdb0",
    "#b1b134",
    "#bbd634",
    "#dbe3b6",
    "#b2c8bd",
    "#165b65",
    "#697d99",
    "#96b8db",
    "#00a4e8",
    "#a4dbdb",
    "#fdd666",
    "#dc9018",
    "#e31a22",
    "#df8f2d",
    "#b24f3f",
    "#b51f29",
    "#f58268",
    "#f4979c",
    "#fafbfc",
  ],
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
    case Actions.SET_IS_FOUND_AUTO_LOADING:
      return {
        ...state,
        isFoundAutoLoading: action.payload,
      };
    case Actions.SET_FOUND_AUTO_ITEMS:
      return {
        ...state,
        foundAutoItems: action.payload.foundAutoItems,
        foundAutoItemsCount: action.payload.count,
      };
    default:
      return state;
  }
};

export default userReducer;
