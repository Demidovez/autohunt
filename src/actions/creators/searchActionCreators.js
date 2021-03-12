import Actions from "../types/searchActionTypes";

export const goClearSearchBarAction = () => ({
  type: Actions.CLEAR_SEARCH_DATA,
});

export const goSearchByNameAction = (searchStr) => ({
  type: Actions.SEARCH_ADVERTS_BY_NAME,
  payload: { searchStr },
});

export const setAdvertsByNameAction = (adverts, count) => ({
  type: Actions.SET_ADVERTS_BY_NAME,
  payload: { adverts, count },
});

export const goSearchByRublesAction = (searchStr) => ({
  type: Actions.SEARCH_ADVERTS_BY_RUBLES,
  payload: { searchStr },
});

export const setAdvertsByRublesAction = (adverts, count) => ({
  type: Actions.SET_ADVERTS_BY_RUBLES,
  payload: { adverts, count },
});

export const goSearchByDollarsAction = (searchStr) => ({
  type: Actions.SEARCH_ADVERTS_BY_DOLLARS,
  payload: { searchStr },
});

export const setAdvertsByDollarsAction = (adverts, count) => ({
  type: Actions.SET_ADVERTS_BY_DOLLARS,
  payload: { adverts, count },
});

export const goSearchByMileageAction = (searchStr) => ({
  type: Actions.SEARCH_ADVERTS_BY_MILEAGE,
  payload: { searchStr },
});

export const setAdvertsByMileageAction = (adverts, count) => ({
  type: Actions.SET_ADVERTS_BY_MILEAGE,
  payload: { adverts, count },
});

export const goSearchByCityAction = (searchStr) => ({
  type: Actions.SEARCH_ADVERTS_BY_CITY,
  payload: { searchStr },
});

export const setAdvertsByCityAction = (adverts, count) => ({
  type: Actions.SET_ADVERTS_BY_CITY,
  payload: { adverts, count },
});

export const goSearchByOtherAction = (searchStr) => ({
  type: Actions.SEARCH_ADVERTS_BY_OTHER,
  payload: { searchStr },
});

export const setAdvertsByOtherAction = (adverts, count) => ({
  type: Actions.SET_ADVERTS_BY_OTHER,
  payload: { adverts, count },
});
