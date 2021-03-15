import Actions from "../actions/types/searchActionTypes";

const initialState = {
  searchStr: "",
  searchBy: "",
  isLoading: true,
  tabs: [
    {
      key: "name",
      title: "По модели",
      sort: 1,
      count: [],
      adverts: [],
    },
    {
      key: "rubles",
      title: "По цене в BYN",
      sort: 2,
      count: [],
      adverts: [],
    },
    {
      key: "dollars",
      title: "По цене в USD",
      sort: 3,
      count: [],
      adverts: [],
    },
    {
      key: "mileage",
      title: "По пробегу",
      sort: 4,
      count: [],
      adverts: [],
    },
    {
      key: "city",
      title: "По городу",
      sort: 5,
      count: [],
      adverts: [],
    },
    {
      key: "other",
      title: "Прочее",
      sort: 6,
      count: [],
      adverts: [],
    },
  ],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.SET_SEARCH_STR:
      return {
        ...state,
        searchStr: action.payload,
      };
    case Actions.SET_SEARCH_BY:
      return {
        ...state,
        searchBy: action.payload,
      };
    case Actions.SET_SEARCH_INFO_TO_RESULT:
      return {
        ...state,
        isLoading: false,
        searchBy: action.payload.searchBy,
        tabs: state.tabs.map((tab) =>
          tab.key === action.payload.searchBy
            ? {
                ...tab,
                adverts: action.payload.adverts,
                count: action.payload.count,
              }
            : tab
        ),
      };
    case Actions.SET_ADVERTS:
      return {
        ...state,
        isLoading: false,
        tabs: initialState.tabs.map((initialTab) => {
          const loadTab = action.payload.find(
            (loadTab) => loadTab.key === initialTab.key
          );

          if (loadTab) {
            return {
              ...initialTab,
              adverts: loadTab.adverts,
              count: loadTab.count,
            };
          } else {
            return initialTab;
          }
        }),
      };
    case Actions.RESET_SEARCH_DATA:
      return {
        ...initialState,
        searchStr: action.payload,
      };
    case Actions.SET_ADVERTS_BY_KEY:
      return {
        ...state,
        isLoading: false,
        tabs: state.tabs.map((tab) =>
          tab.key === action.payload.key
            ? {
                ...tab,
                adverts: action.payload.adverts,
                count: action.payload.count,
              }
            : tab
        ),
      };
    default:
      return state;
  }
};

export default searchReducer;
