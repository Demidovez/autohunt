import Actions from "../actions/types/searchActionTypes";

const initialState = {
  searchStr: "",
  searchBy: "",
  isLoading: true,
  tabs: [
    {
      key: "name",
      title: "По модели",
      count: 0,
      adverts: [],
      offset: 0,
      moreAdverts: [],
    },
    {
      key: "rubles",
      title: "По цене в BYN",
      count: 0,
      adverts: [],
      offset: 0,
      moreAdverts: [],
    },
    {
      key: "dollars",
      title: "По цене в USD",
      count: 0,
      adverts: [],
      offset: 0,
      moreAdverts: [],
    },
    {
      key: "mileage",
      title: "По пробегу",
      count: 0,
      adverts: [],
      offset: 0,
      moreAdverts: [],
    },
    {
      key: "city",
      title: "По городу",
      count: 0,
      adverts: [],
      offset: 0,
      moreAdverts: [],
    },
    {
      key: "other",
      title: "Прочее",
      count: 0,
      adverts: [],
      offset: 0,
      moreAdverts: [],
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
    case Actions.SET_SEARCH_ADVERTS_MORE:
      return {
        ...state,
        isLoading: false,
        tabs: state.tabs.map((tab) =>
          tab.key === action.payload.searchBy
            ? {
                ...tab,
                offset: tab.offset + 15,
                moreAdverts: [
                  ...tab.moreAdverts,
                  ...action.payload.moreAdverts,
                ],
              }
            : tab
        ),
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
