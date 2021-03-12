import Actions from "../actions/types/searchActionTypes";

const initialState = {
  advertsByName: [],
  countByName: 0,
  advertsByRubles: [],
  countByRubles: 0,
  advertsByDollars: [],
  countByDollars: 0,
  advertsByMileage: [],
  countByMileage: 0,
  advertsByCity: [],
  countByCity: 0,
  advertsByOther: [],
  countByOther: 0,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_ADVERTS_BY_NAME:
      return {
        ...state,
        advertsByName: action.payload.adverts,
        countByName: action.payload.count,
      };
    case Actions.SET_ADVERTS_BY_RUBLES:
      return {
        ...state,
        advertsByRubles: action.payload.adverts,
        countByRubles: action.payload.count,
      };
    case Actions.SET_ADVERTS_BY_DOLLARS:
      return {
        ...state,
        advertsByDollars: action.payload.adverts,
        countByDollars: action.payload.count,
      };
    case Actions.SET_ADVERTS_BY_MILEAGE:
      return {
        ...state,
        advertsByMileage: action.payload.adverts,
        countByMileage: action.payload.count,
      };
    case Actions.SET_ADVERTS_BY_CITY:
      return {
        ...state,
        advertsByCity: action.payload.adverts,
        countByCity: action.payload.count,
      };
    case Actions.SET_ADVERTS_BY_OTHER:
      return {
        ...state,
        advertsByOther: action.payload.adverts,
        countByOther: action.payload.count,
      };
    case Actions.CLEAR_SEARCH_DATA:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default searchReducer;
