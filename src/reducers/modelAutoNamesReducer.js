import Actions from "../actions/types/modelAutoNamesActionTypes";

const initialState = {
  modelNames: [],
  seriesNames: [
    {
      model: "",
      series: [],
    },
  ],
  generationNames: [
    {
      model: "",
      series: "",
      generations: [],
    },
  ],
  colorNames: [],
  carcaseNames: [],
  fuelNames: [],
};

const modelAutoNamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_ALL_MODELS:
      return {
        ...state,
        modelNames: action.payload,
      };
    case Actions.SET_ALL_SERIES_OF_MODEL:
      return {
        ...state,
        // TODO: Создаются объекты с одинаковыми моделями
        seriesNames: [
          ...state.seriesNames,
          { model: action.payload.model, series: action.payload.series },
        ],
      };
    case Actions.SET_ALL_GENERATION_OF_SERIES:
      return {
        ...state,
        // TODO: Создаются объекты с одинаковыми моделями и сериями
        generationNames: [
          ...state.generationNames,
          {
            model: action.payload.model,
            series: action.payload.series,
            generations: action.payload.generations,
          },
        ],
      };
    case Actions.SET_ALL_COLOR_NAMES:
      return {
        ...state,
        colorNames: action.payload,
      };
    case Actions.SET_ALL_CARCASE_NAMES:
      return {
        ...state,
        carcaseNames: action.payload,
      };
    case Actions.SET_ALL_FUEL_NAMES:
      return {
        ...state,
        fuelNames: action.payload,
      };
    default:
      return state;
  }
};

export default modelAutoNamesReducer;
