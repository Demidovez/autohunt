import Actions from "../actions/types/filterBarActionTypes";
import {
  resetFieldOfFilterOptions,
  updateListOfTagsByArray,
  updateListOfTagsByOne,
  updateListOfTagsByModel,
} from "../helpers";

const initialState = {
  isLoadingAdverts: false,
  isNeedFetchAdverts: true,
  filterOptions: {
    searchStr: "",
    searchBy: "all",
    priceMin: null,
    priceMax: null,
    isExchange: false,
    models: [
      {
        name: null,
        id: 0,
      },
    ],
    series: [
      {
        name: null,
        id: 0,
      },
    ],
    generations: [
      {
        name: null,
        id: 0,
      },
    ],
    carcases: [],
    fuels: [],
    yearMin: null,
    yearMax: null,
    transmissions: [],
    gearings: [],
    volumeMin: null,
    volumeMax: null,
    mileageMin: null,
    mileageMax: null,
    colors: [],
    currency: { label: "BYN", unit: "р." },
    order: null,
    limitAdverts: 15,
    offsetStep: 15,
  },
  orderData: [
    {
      label: "Новые объявления",
      value: [["id", "DESC"]],
    },
    {
      label: "Старые объявления",
      value: [["id", "ASC"]],
    },
    {
      label: "Дешевые авто",
      value: [["price", "ASC"]],
    },
    {
      label: "Дорогие авто",
      value: [["price", "DESC"]],
    },
  ],
  orderValue: {},
  isFilterChanged: false,
  tags: [],
  tagPostfixesPrefixes: {
    priceMin: { pre: "от", post: "р." },
    priceMax: { pre: "до", post: "р." },
    yearMin: { pre: "от", post: "г." },
    yearMax: { pre: "до", post: "г." },
    volumeMin: { pre: "от", post: "л." },
    volumeMax: { pre: "до", post: "л." },
    mileageMin: { pre: "от", post: "км." },
    mileageMax: { pre: "до", post: "км." },
    searchStr: { pre: "", post: "" },
  },
  adverts: [],
  moreAdverts: [],
  countAllAdverts: 0,
  offset: 0,
};

const filterBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ADVERTS:
      return {
        ...state,
        isLoadingAdverts: true,
      };
    case Actions.SET_ADVERTS:
      return {
        ...state,
        adverts: action.payload.adverts,
        moreAdverts: [],
        countAllAdverts: action.payload.count,
        isFilterChanged: state.tags.length > 0,
        isNeedFetchAdverts: false,
        isLoadingAdverts: false,
      };
    case Actions.SET_SEARCH_INFO_TO_FILTER:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          searchStr: action.payload.searchStr,
          searchBy: action.payload.searchBy,
        },
        tags: updateListOfTagsByOne(
          state.tags,
          "searchStr",
          action.payload.searchStr
        ),
        tagPostfixesPrefixes: {
          ...state.tagPostfixesPrefixes,
          searchStr: {
            pre:
              "Поиск " +
              action.payload.searchTitle[0].toLowerCase() +
              action.payload.searchTitle.slice(1) +
              ":",
            post: "",
          },
        },
      };
    case Actions.SET_IS_EXCHANGE_ADVERTS:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          isExchange: !state.filterOptions.isExchange,
        },
        tags: updateListOfTagsByArray(
          state.tags,
          "isExchange",
          !state.filterOptions.isExchange ? ["обмен"] : []
        ),
        isNeedFetchAdverts: true,
      };
    case Actions.SET_CURRENCY:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          currency: action.payload,
        },
        tagPostfixesPrefixes: {
          ...state.tagPostfixesPrefixes,
          priceMin: {
            ...state.tagPostfixesPrefixes.priceMin,
            post: action.payload.unit,
          },
          priceMax: {
            ...state.tagPostfixesPrefixes.priceMax,
            post: action.payload.unit,
          },
        },
        isNeedFetchAdverts: !!(
          state.filterOptions.priceMin || state.filterOptions.priceMax
        ),
      };
    case Actions.SET_NUMBER_VALUE_BY_FIELD:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          [action.payload.field]: action.payload.value,
        },
        tags: updateListOfTagsByOne(
          state.tags,
          action.payload.field,
          action.payload.value
        ),
        isNeedFetchAdverts: true,
      };
    case Actions.SET_MODEL:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          models: state.filterOptions.models.map((model) =>
            model.id === action.payload.id
              ? { ...model, name: action.payload.model }
              : model
          ),
          series: state.filterOptions.series.map((series) =>
            series.id === action.payload.id
              ? { ...series, name: action.payload.series }
              : series
          ),
          generations: state.filterOptions.generations.map((generation) =>
            generation.id === action.payload.id
              ? { ...generation, name: action.payload.generation }
              : generation
          ),
        },
        tags: updateListOfTagsByModel(state.tags, action.payload),
        isNeedFetchAdverts: true,
      };
    case Actions.SET_CARCASES:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          carcases: action.payload,
        },
        tags: updateListOfTagsByArray(state.tags, "carcases", action.payload),
        isNeedFetchAdverts: true,
      };
    case Actions.SET_FUELS:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          fuels: action.payload,
        },
        tags: updateListOfTagsByArray(state.tags, "fuels", action.payload),
        isNeedFetchAdverts: true,
      };
    case Actions.SET_TRANSMISSIONS:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          transmissions: action.payload,
        },
        tags: updateListOfTagsByArray(
          state.tags,
          "transmissions",
          action.payload
        ),
        isNeedFetchAdverts: true,
      };
    case Actions.SET_GEARINGS:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          gearings: action.payload,
        },
        tags: updateListOfTagsByArray(state.tags, "gearings", action.payload),
        isNeedFetchAdverts: true,
      };
    case Actions.SET_COLORS:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          colors: action.payload,
        },
        tags: updateListOfTagsByArray(state.tags, "colors", action.payload),
        isNeedFetchAdverts: true,
      };
    case Actions.ADD_MODEL_AUTO:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          models: [
            ...state.filterOptions.models,
            {
              name: null,
              id:
                state.filterOptions.models[
                  state.filterOptions.models.length - 1
                ].id + 1,
            },
          ],
          series: [
            ...state.filterOptions.series,
            {
              name: null,
              id:
                state.filterOptions.series[
                  state.filterOptions.series.length - 1
                ].id + 1,
            },
          ],
          generations: [
            ...state.filterOptions.generations,
            {
              name: null,
              id:
                state.filterOptions.generations[
                  state.filterOptions.generations.length - 1
                ].id + 1,
            },
          ],
        },
      };
    case Actions.REMOVE_MODEL_AUTO:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          models: [
            ...state.filterOptions.models.filter(
              (_, index) => index !== action.payload
            ),
          ],
          series: [
            ...state.filterOptions.series.filter(
              (_, index) => index !== action.payload
            ),
          ],
          generations: [
            ...state.filterOptions.generations.filter(
              (_, index) => index !== action.payload
            ),
          ],
        },
        isNeedFetchAdverts: true,
      };
    case Actions.SET_MORE_ADVERTS:
      return {
        ...state,
        moreAdverts: [...state.moreAdverts, ...action.payload],
        offset: state.offset + state.filterOptions.offsetStep,
        isNeedFetchAdverts: false,
      };
    case Actions.SET_ORDER_ADVERTS:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          order: action.payload,
        },
        isNeedFetchAdverts: true,
      };
    case Actions.CLOSE_TAG:
      return {
        ...state,
        tags: state.tags.filter(
          (tag) => JSON.stringify(tag) !== JSON.stringify(action.payload)
        ),
        filterOptions: {
          ...state.filterOptions,
          [action.payload.field]: resetFieldOfFilterOptions(
            initialState.filterOptions,
            state.filterOptions,
            action.payload
          ),
        },
        isNeedFetchAdverts: true,
      };
    case Actions.RESET_FILTER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default filterBarReducer;
