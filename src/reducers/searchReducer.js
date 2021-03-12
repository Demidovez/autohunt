import Actions from "../actions/types/searchActionTypes";

const initialState = {
  tabs: [
    {
      key: "name",
      title: "По модели",
      sort: 1,
      count: [],
      adverts: [],
      isLoading: false,
    },
    {
      key: "rubles",
      title: "По цене в BYN",
      sort: 2,
      count: [],
      adverts: [],
      isLoading: false,
    },
    {
      key: "dollars",
      title: "По цене в USD",
      sort: 3,
      count: [],
      adverts: [],
      isLoading: false,
    },
    {
      key: "mileage",
      title: "По пробегу",
      sort: 4,
      count: [],
      adverts: [],
      isLoading: false,
    },
    {
      key: "city",
      title: "По городу",
      sort: 5,
      count: [],
      adverts: [],
      isLoading: false,
    },
    {
      key: "other",
      title: "Прочее",
      sort: 6,
      count: [],
      adverts: [],
      isLoading: false,
    },
  ],
};

// TODO: Дублирование кода в CASE

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_IS_LOADING:
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.key === action.payload.key
            ? {
                ...tab,
                isLoading: true,
              }
            : tab
        ),
      };
    case Actions.SET_ADVERTS_BY_NAME:
      return {
        ...state,

        tabs: state.tabs.map((tab) =>
          tab.key === "name"
            ? {
                ...tab,
                adverts: action.payload.adverts,
                count: action.payload.count,
                isLoading: false,
              }
            : tab
        ),
      };
    case Actions.SET_ADVERTS_BY_RUBLES:
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.key === "rubles"
            ? {
                ...tab,
                adverts: action.payload.adverts,
                count: action.payload.count,
                isLoading: false,
              }
            : tab
        ),
      };
    case Actions.SET_ADVERTS_BY_DOLLARS:
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.key === "dollars"
            ? {
                ...tab,
                adverts: action.payload.adverts,
                count: action.payload.count,
                isLoading: false,
              }
            : tab
        ),
      };
    case Actions.SET_ADVERTS_BY_MILEAGE:
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.key === "mileage"
            ? {
                ...tab,
                adverts: action.payload.adverts,
                count: action.payload.count,
                isLoading: false,
              }
            : tab
        ),
      };
    case Actions.SET_ADVERTS_BY_CITY:
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.key === "city"
            ? {
                ...tab,
                adverts: action.payload.adverts,
                count: action.payload.count,
                isLoading: false,
              }
            : tab
        ),
      };
    case Actions.SET_ADVERTS_BY_OTHER:
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.key === "other"
            ? {
                ...tab,
                adverts: action.payload.adverts,
                count: action.payload.count,
                isLoading: false,
              }
            : tab
        ),
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
