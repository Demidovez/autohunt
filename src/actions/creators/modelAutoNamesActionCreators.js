import Actions from "../types/modelAutoNamesActionTypes";

export const setAllModelsAction = (models) => ({
  type: Actions.SET_ALL_MODELS,
  payload: models,
});

export const getAllSeriesOfModelAction = (model) => ({
  type: Actions.GET_ALL_SERIES_OF_MODEL,
  payload: model,
});

export const setAllSeriesOfModelAction = (seriesInfo) => ({
  type: Actions.SET_ALL_SERIES_OF_MODEL,
  payload: seriesInfo,
});

export const getAllGenerationsOfSeriesAction = ({ model, series }) => ({
  type: Actions.GET_ALL_GENERATION_OF_SERIES,
  payload: { model, series },
});

export const setAllGenerationsOfSeriesAction = (generationsInfo) => ({
  type: Actions.SET_ALL_GENERATION_OF_SERIES,
  payload: generationsInfo,
});

export const setAllColorNamesAction = (colors) => ({
  type: Actions.SET_ALL_COLOR_NAMES,
  payload: colors,
});

export const getAllOptionCarNamesAction = () => ({
  type: Actions.GET_ALL_OPTION_CAR_NAMES,
});

export const setAllCarcaseNamesAction = (carcases) => ({
  type: Actions.SET_ALL_CARCASE_NAMES,
  payload: carcases,
});

export const setAllFuelNamesAction = (fuels) => ({
  type: Actions.SET_ALL_FUEL_NAMES,
  payload: fuels,
});
