import Actions from "../actions/types/newsActionTypes";

const initialState = {
  news: [],
  moreNews: [],
  count: 0,
  offset: 0,
  offsetStep: 15,
  orderValue: null,
  orderData: [
    {
      label: "Новые новости",
      value: [["id", "DESC"]],
    },
    {
      label: "Старые новости",
      value: [["id", "ASC"]],
    },
  ],
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_ALL_NEWS:
      return {
        ...state,
        news: action.payload.news,
        count: action.payload.count,
      };
    case Actions.SET_MORE_NEWS:
      return {
        ...state,
        moreNews: action.payload,
        offset: state.offset + state.offsetStep,
      };
    default:
      return state;
  }
};

export default newsReducer;
