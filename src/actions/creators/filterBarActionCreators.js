import Actions from "../types/filterBarActionTypes";

export const setSearchInfoToFilterAction = (
  searchStr,
  searchBy,
  searchTitle
) => ({
  type: Actions.SET_SEARCH_INFO_TO_FILTER,
  payload: { searchStr, searchBy, searchTitle },
});

export const getAdvertsAction = (options) => ({
  type: Actions.GET_ADVERTS,
  payload: options,
});

export const setAdvertsAction = (adverts, count) => ({
  type: Actions.SET_ADVERTS,
  payload: { adverts, count },
});

export const setIsExchangeAction = () => ({
  type: Actions.SET_IS_EXCHANGE_ADVERTS,
});

export const setInputValueByFieldAction = (field, value) => ({
  type: Actions.SET_NUMBER_VALUE_BY_FIELD,
  payload: { field, value },
});

export const setModelAction = (model) => ({
  type: Actions.SET_MODEL,
  payload: model,
});

export const setCarcasesAction = (carcases) => ({
  type: Actions.SET_CARCASES,
  payload: carcases,
});

export const setFuelsAction = (fuels) => ({
  type: Actions.SET_FUELS,
  payload: fuels,
});

export const setTransmissionsAction = (transmissions) => ({
  type: Actions.SET_TRANSMISSIONS,
  payload: transmissions,
});

export const setGearingsAction = (gearings) => ({
  type: Actions.SET_GEARINGS,
  payload: gearings,
});

export const setColorsAction = (colors) => ({
  type: Actions.SET_COLORS,
  payload: colors,
});

export const setCurrencyAction = (currency) => ({
  type: Actions.SET_CURRENCY,
  payload: currency,
});

export const closeTagAction = (tag) => ({
  type: Actions.CLOSE_TAG,
  payload: tag,
});

export const onAddModelAutoAction = () => ({
  type: Actions.ADD_MODEL_AUTO,
});

export const onRemoveModelAutoAction = (index) => ({
  type: Actions.REMOVE_MODEL_AUTO,
  payload: index,
});

export const onResetFilterAction = () => ({
  type: Actions.RESET_FILTER,
});

export const getMoreAdvertsAction = (filterOptions, offset) => ({
  type: Actions.GET_MORE_ADVERTS,
  payload: { filterOptions, offset },
});

export const setMoreAdvertsAction = (moreAdverts) => ({
  type: Actions.SET_MORE_ADVERTS,
  payload: moreAdverts,
});

export const setOrderAdvertsAction = (orderValue) => ({
  type: Actions.SET_ORDER_ADVERTS,
  payload: orderValue,
});
